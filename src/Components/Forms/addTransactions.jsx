import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Navbar from "../Reusables/Navbar";
import "../../Styles/Components/forms.css";
import axios from "axios";

const ExpenseForm = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false); // Reset success state on new submission

    // Basic validation
    if (!category || !amount || !description) {
      setError("All fields are required.");
      return;
    }

    // Validate amount
    if (amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    // Prepare the expense data
    const expenseData = {
      category,
      amount: parseFloat(amount),
      description,
    };

    try {
      // Send the expense data to the API
      const response = await axios.post("/expense/add", expenseData);
      if (response.status === 200) {
        // Check for 201 Created status
        console.log("Expense added successfully");
        setSuccess(true); // Set success state to true
        // Reset form fields
        setCategory("");
        setAmount(0); // Reset to 0 instead of an empty string
        setDescription("");
      } else {
        console.log("Error adding expense");
        setError("Error adding expense. Please try again.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Error adding expense. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="form mt-5 col-md-6">
        <h2 className="text-center">Add Expense</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">Expense added successfully!</div>
        )}{" "}
        {/* Success message */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.1"
              min="0" // Prevent negative values in the input
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ExpenseForm;
