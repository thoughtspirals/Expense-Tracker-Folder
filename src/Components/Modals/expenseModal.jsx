import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

const ExpenseModal = ({ show, onClose, expenseData, mode, onAction }) => {
  const [loading, setLoading] = useState(false);

  if (!expenseData) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onAction(expenseData); // Ensure onAction handles the deletion
      onClose(); // Close modal after successful deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Expense Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>ID:</strong> {expenseData._id}
        </p>
        <p>
          <strong>Date:</strong> {expenseData.date}
        </p>
        <p>
          <strong>Category:</strong> {expenseData.category}
        </p>
        <p>
          <strong>Amount:</strong> ₹{expenseData.amount}
        </p>
        <p>
          <strong>Description:</strong> {expenseData.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        {mode === "delete" && (
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
