import React, { useState } from "react";
import Navbar from "../Reusables/Navbar";
import axios from "axios";
import { Modal, Button, Form, Card, Container } from "react-bootstrap";

const CheckBudget = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [budgetInfo, setBudgetInfo] = useState(null); // State to hold budget info
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showBudgetModal, setShowBudgetModal] = useState(false); // State to control budget modal

  // Function to check budget
  const checkBudget = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        `/budget/check-budget?month=${month}&year=${year}`,
        { withCredentials: true }
      );

      console.log("Check Budget Response:", response.data);
      setBudgetInfo(response.data); // Update state with budget info
      setShowBudgetModal(true); // Show the budget info modal
    } catch (error) {
      console.error("Error checking budget:", error);
      setError("Error checking budget. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="text-center mb-4">Check Budget</h2>
      <Card
        style={{ maxWidth: "600px", margin: "auto" }} // Inline styles for max-width
        className="Cards text-center shadow p-4 text-dark"
      >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Month:</Form.Label>
              <Form.Control
                type="number"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                min="1"
                max="12"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                min="2000"
                max="2100"
              />
            </Form.Group>
            <Button variant="primary" onClick={checkBudget} disabled={loading}>
              {loading ? "Checking..." : "Check Budget"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Display Error Message */}
      {error && (
        <Modal show={true} onHide={() => setError(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setError(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Budget Information Modal */}
      <Modal
        show={showBudgetModal}
        onHide={() => setShowBudgetModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Budget Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {budgetInfo && (
            <>
              <Card.Text>
                <strong>Budget Amount:</strong> ₹{budgetInfo.budget_amount}
              </Card.Text>
              <Card.Text>
                <strong>Total Spent:</strong> ₹{budgetInfo.total_spent}
              </Card.Text>
              <Card.Text>
                <strong>Remaining Budget:</strong> ₹
                {budgetInfo.remaining_budget}
              </Card.Text>
              <Card.Text>
                <strong>Budget Exceeded:</strong>{" "}
                {budgetInfo.budget_exceeded ? "Yes" : "No"}
              </Card.Text>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBudgetModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckBudget;
