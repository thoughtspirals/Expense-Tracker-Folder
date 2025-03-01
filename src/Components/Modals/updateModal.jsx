import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const EditExpenseModal = ({ show, onClose, expenseData, onUpdate }) => {
  const [editedData, setEditedData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Initialize form with current data when modal opens
  useEffect(() => {
    if (expenseData) {
      setEditedData({
        date: expenseData.date || "",
        category: expenseData.category || "",
        amount: expenseData.amount || "",
        description: expenseData.description || "",
      });
    }
  }, [expenseData]);

  const handleChange = (e) => {
    setEditedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!expenseData?._id) {
      console.error("Invalid expense ID");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `/expense/update/${expenseData._id}`,
        editedData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        onUpdate?.(response.data); // Ensure onUpdate is a function before calling it
        onClose();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      alert("Transaction updated successfully!");
    }
  };

  if (!expenseData) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control plaintext readOnly value={expenseData._id} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={editedData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={editedData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={editedData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExpenseModal;
