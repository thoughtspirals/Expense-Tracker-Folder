import { useState } from "react";
import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import DataSheet from "../Forms/datasheet";
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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `/expense/filtered-expenses?${queryParams}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      // Handle data as needed
    } catch (err) {
      setError("Error fetching transactions");
      console.error("Error:", err);
    }
  };

  const handleUpdateTransaction = async (updatedData) => {
    try {
      console.log("Updating transaction:", updatedData); // Debugging log

      const response = await fetch(`/expense/update/${updatedData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Update failed");

      console.log("Transaction updated successfully!"); // Debugging log

      setSuccess("Transaction updated successfully!"); // Set success message

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

      fetchTransactions();
      setShowModal(false); // Close the modal after successful update
    } catch (err) {
      setError("Error updating transaction");
      console.error("Error:", err);
    }
  };

  const handleRowClick = (transaction) => {
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

        {/* Identical Filter Section */}
        <Form onSubmit={handleFilterSubmit} className="mb-3">
          <Row
            className="p-2"
            style={{
              backgroundColor: "#5a5a5a",
              color: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "3px",
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

            <Col xs="auto" style={{ minWidth: "120px" }}>
              <Form.Group>
                <Form.Label className="small">Price</Form.Label>
                <Form.Select
                  name="order"
                  value={filters.order}
                  onChange={handleFilterChange}
                  size="sm"
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs="auto" className="d-flex justify-content-center">
              <Button type="submit" className="btn btn-primary btn-md px-3">
                Apply
              </Button>
            </Col>
          </Row>
        </Form>

        <DataSheet
          apiEndpoint="/expense/filtered-expenses"
          filters={filters}
          columns={["Date", "Category", "Amount", "Description"]}
          mode="update"
          onRowClick={handleRowClick}
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
