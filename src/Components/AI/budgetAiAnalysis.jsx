import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Alert, Table, Spinner } from "react-bootstrap";

const BudgetAI = () => {
  const [budgetData, setBudgetData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formattedText, setFormattedText] = useState(""); // Stores formatted AI response

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get("/ai/budget_ai", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setBudgetData(response.data);
        formatSuggestions(response.data.ai_budget_optimization_suggestions);
      } catch (err) {
        setError(
          err.response
            ? err.response.data.error
            : "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  // Function to format AI suggestions for better readability
  const formatSuggestions = (fullText) => {
    if (!fullText) return;

    const formattedText = fullText
      .replace(/\n/g, "<br>") // Convert line breaks to <br>
      .replace(/-\s(.+?)(?=<br>|$)/g, "<li>$1</li>") // Convert bullet points to <li>
      .replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>"); // Wrap <li> in <ul>

    setFormattedText(formattedText);
  };

  return (
    <Container className="mt-4 text-start">
      <h2 className="mb-4">💰 Budget Analysis</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          ❌ {error}
        </Alert>
      )}

      {budgetData && (
        <Card className="mt-4 shadow p-4">
          <Card.Body>
            <Card.Title className="fs-4 text-dark">
              Budget Analysis Results
            </Card.Title>

            <Card.Text>
              <strong>Annual Budget:</strong> ₹{budgetData.annual_budget}
            </Card.Text>

            <Card.Text>
              <strong>Total Spent Per Category:</strong>
            </Card.Text>

            <Table striped bordered hover className="mt-2">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(budgetData.total_spent_per_category).map(
                  ([category, amount]) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>₹{amount}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            <Card.Text>
              <strong>🧠 AI Budget Optimization Suggestions:</strong>
            </Card.Text>
            <div
              className="p-2"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BudgetAI;
