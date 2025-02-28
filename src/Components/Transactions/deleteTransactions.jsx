import { useState } from "react";
import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import DataSheet from "../Forms/datasheet";
import Navbar from "../Reusables/Navbar";

const DeleteTransactionsPage = () => {
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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  const fetchTransactions = async () => {
    try {
      console.log("Fetching transactions with filters:", filters);
      const queryParams = new URLSearchParams(filters).toString();
      console.log("Query Params:", queryParams);
      const response = await fetch(
        `/expense/filtered-expenses?${queryParams}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch filtered transactions: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Filtered Transactions:", data);
    } catch (err) {
      setError("Error fetching transactions");
      console.error("Error fetching transactions:", err.message || err);
    }
  };

  const handleDeleteTransactions = async (transaction) => {
    try {
      const response = await fetch(`/expense/delete/${transaction._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete transaction: ${response.statusText}`);
      }
      alert("Transaction deleted successfully");
      fetchTransactions();
    } catch (err) {
      setError("Error deleting transaction");
      console.error("Error deleting transaction:", err.message || err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="datasheet">
        <h2 className="fs-3">Delete Transactions</h2>
        {error && (
          <Alert variant="danger" className="fs-6">
            {error}
          </Alert>
        )}

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
                  className=""
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
          mode="delete" // Enable delete mode
          multiSelect={true} // Allow multiple selections
          onAction={handleDeleteTransactions} // Pass delete function
        />
      </div>
    </>
  );
};

export default DeleteTransactionsPage;
