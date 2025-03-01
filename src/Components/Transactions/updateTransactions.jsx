import { useState, useEffect } from "react";
import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import UpdateExpensesDataSheet from "../Forms/updateExpensesDatasheet";
import Navbar from "../Reusables/Navbar";
import EditExpenseModal from "../Modals/updateModal";

const UpdateTransactionsPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    start_date: "",
    end_date: "",
    min_amount: "",
    max_amount: "",
    sort_by: "date",
    order: "desc",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Added success state
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    console.log("Filters updated:", filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    console.log("Filter changed:", e.target.name, "=", e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting filters:", filters);
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      console.log("Fetching transactions with query params:", queryParams);

      const response = await fetch(
        `/expense/filtered-expenses?${queryParams}`,
        { credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      console.log("Fetched Transactions Data:", data);
    } catch (err) {
      setError("Error fetching transactions");
      console.error("Error fetching transactions:", err);
    }
  };

  const handleUpdateTransaction = async (updatedData) => {
    try {
      console.log("Updating transaction:", updatedData);

      const response = await fetch(`/expense/update/${updatedData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Update failed");

      console.log("Transaction updated successfully!");

      setSuccess("Transaction updated successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      fetchTransactions();
      setShowModal(false);
    } catch (err) {
      setError("Error updating transaction");
      console.error("Error updating transaction:", err);
    }
  };

  const handleRowClick = (transaction) => {
    console.log("Row clicked, opening modal for transaction:", transaction);
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="datasheet">
        <h2 className="fs-3">Update Transactions</h2>
        {error && (
          <Alert variant="danger" className="fs-6">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="fs-6">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleFilterSubmit} className="mb-3">
          <Row
            className="p-2"
            style={{
              backgroundColor: "#5a5a5a",
              color: "white",
              borderRadius: "8px",
            }}
          >
            <Col xs={2}>
              <Form.Group>
                <Form.Label className="small">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  size="sm"
                  className="p-1"
                >
                  <option value="">All</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Form.Group>
                <Form.Label className="small">Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start_date"
                  value={filters.start_date}
                  onChange={handleFilterChange}
                  size="sm"
                  className="p-1"
                />
              </Form.Group>
            </Col>
            <Col xs={2}>
              <Form.Group>
                <Form.Label className="small">End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="end_date"
                  value={filters.end_date}
                  onChange={handleFilterChange}
                  size="sm"
                  className="p-1"
                />
              </Form.Group>
            </Col>
            <Col xs={1}>
              <Form.Group>
                <Form.Label className="small">Min ₹</Form.Label>
                <Form.Control
                  type="number"
                  name="min_amount"
                  value={filters.min_amount}
                  onChange={handleFilterChange}
                  size="sm"
                  className="p-1"
                />
              </Form.Group>
            </Col>
            <Col xs={1}>
              <Form.Group>
                <Form.Label className="small">Max ₹</Form.Label>
                <Form.Control
                  type="number"
                  name="max_amount"
                  value={filters.max_amount}
                  onChange={handleFilterChange}
                  size="sm"
                  className="p-1"
                />
              </Form.Group>
            </Col>
            <Col xs={1}>
              <Form.Group>
                <Form.Label className="small">Sort</Form.Label>
                <Form.Select
                  name="sort_by"
                  value={filters.sort_by}
                  onChange={handleFilterChange}
                  size="sm"
                  className="p-1"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button type="submit" className="btn btn-primary btn-md px-3">
                Apply
              </Button>
            </Col>
          </Row>
        </Form>

        <UpdateExpensesDataSheet
          apiEndpoint="/expense/filtered-expenses"
          filters={filters}
          columns={["Date", "Category", "Amount", "Description"]}
          mode="update"
          onRowClick={handleRowClick}
          onAction={(updatedExpense) => {
            console.log("Expense updated:", updatedExpense);
            // You can add any other function handling here
          }}
        />

        <EditExpenseModal
          show={showModal}
          onClose={() => setShowModal(false)}
          expenseData={selectedTransaction}
          onAction={handleUpdateTransaction}
        />
      </div>
    </>
  );
};

export default UpdateTransactionsPage;
