import { Modal, Button } from "react-bootstrap";

const ExpenseModal = ({ show, onClose, expenseData, mode, onAction }) => {
  console.log("Modal Mode:", mode);

  if (!expenseData) return null;

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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {mode === "delete" && (
          <Button variant="danger" onClick={() => onAction(expenseData)}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
