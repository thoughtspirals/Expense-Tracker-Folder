import { useState, useEffect } from "react";
import { Table, Spinner, Alert, Pagination } from "react-bootstrap";
import axios from "axios";
import ExpenseModal from "../Modals/expenseModal";

const ITEMS_PER_PAGE = 20;
const PAGE_RANGE_DISPLAY = 5;

const DataSheet = ({
  apiEndpoint,
  filters,
  columns,
  mode = "view", // Default to view mode
  onAction,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage, filters]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(apiEndpoint, {
        params: { page: currentPage, per_page: ITEMS_PER_PAGE, ...filters },
        withCredentials: true,
      });

      setData(response.data.expenses || []);
      setTotalPages(response.data.pagination.total_pages || 1);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error Fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    let pages = [];
    let startPage = Math.max(
      1,
      currentPage - Math.floor(PAGE_RANGE_DISPLAY / 2)
    );
    let endPage = Math.min(totalPages, startPage + PAGE_RANGE_DISPLAY - 1);

    if (endPage - startPage + 1 < PAGE_RANGE_DISPLAY) {
      startPage = Math.max(1, endPage - PAGE_RANGE_DISPLAY + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pages.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
      }
      pages.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return pages;
  };

  const handleRowClick = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const handleDeleteSuccess = async (expense) => {
    try {
      await onAction(expense);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <>
      <h2 className="fs-5">DataSheet</h2>
      {error && (
        <Alert variant="danger" className="fs-6">
          {error}
        </Alert>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    width: `${100 / columns.length}%`,
                    textAlign: "center",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(item)}
                style={{ cursor: "pointer" }}
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    style={{
                      width: `${100 / columns.length}%`,
                      textAlign: "center",
                    }}
                  >
                    {item[col.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {totalPages > 1 && (
        <Pagination className="pagination justify-content-center">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      <ExpenseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        expenseData={selectedExpense}
        mode={mode}
        onAction={handleDeleteSuccess}
      />
    </>
  );
};

export default DataSheet;
