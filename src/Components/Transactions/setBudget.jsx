import React, { useState, useContext } from "react";
import Navbar from "../Reusables/Navbar";
import { ExpenseContext } from "../../Context/expenseContext";
import axios from "axios";
import { Modal, Button, Form, Card, Container } from "react-bootstrap";

const SetBudget = () => {
  const { budget, setBudget } = useContext(ExpenseContext);
  const currentMonth = new Date().getMonth() + 1; // Months are 0-based
  const currentYear = new Date().getFullYear();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || 0);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);

  // Open Modal
  const openModal = () => {
    setNewBudget(budget || 0); // Reset newBudget when opening modal
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => setIsModalOpen(false);

  // Handle Budget Update
  const handleUpdateBudget = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/budget/set-budget",
        { budget: Number(newBudget), month, year },
        { withCredentials: true }
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        closeModal(); // Close modal
        window.location.reload(); // Refresh page
        setBudget(newBudget); // Update Context
      }
    } catch (error) {
      console.error("Error updating budget:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="text-center mb-4">Set Budget</h2>
      <Card
        style={{ maxWidth: "600px", margin: "auto" }}
        className=" Cards text-center shadow p-4 text-dark"
      >
        <Card.Body>
          <Card.Title className="text-dark">
            Budget: ₹{budget || "Not Set"}
          </Card.Title>
          <Card.Text>Month: {currentMonth}</Card.Text>
          <Card.Text>Year: {currentYear}</Card.Text>
          <Button variant="primary" onClick={openModal}>
            Set Budget
          </Button>
        </Card.Body>
      </Card>

      {/* Bootstrap Modal */}
      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Set Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Budget Amount:</Form.Label>
              <Form.Control
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                min="0" // Prevent negative budget
              />
            </Form.Group>

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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateBudget}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Budget"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetBudget;
