import React from "react";
import ExpenseBarChart from "./barGraph"; // Ensure the path is correct
import IncomeExpensePieChart from "./pieChart"; // Ensure the path is correct
import MonthlyTrendsChart from "./lineChart"; // Ensure the path is correct
import { Card, Container, Row, Col } from "react-bootstrap";

const Charts = () => {
  return (
    <Container className="charts">
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-dark">Expense Bar Chart</Card.Title>
              <ExpenseBarChart />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-dark">
                Income vs Expense Pie Chart
              </Card.Title>
              <IncomeExpensePieChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="text-dark">Monthly Trends</Card.Title>
              <MonthlyTrendsChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
