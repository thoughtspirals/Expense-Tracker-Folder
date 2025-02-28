import React, { useContext } from "react";
import Navbar from "../Reusables/Navbar";
import { Card, Container, Row, Col } from "react-bootstrap";
import { ExpenseContext } from "../../Context/expenseContext";
import { UserContext } from "../../Context/userContext";
import "../../Styles/Components/Common/dashboard.css";

//Charts
import Charts from "./DashboardStats/charts";

const Dashboard = () => {
  const { monthlyIncome } = useContext(UserContext);
  const { totalExpense, budget, remainingBudget, previousSavings } =
    useContext(ExpenseContext);
  const date = new Date();
  const year = date.getFullYear();
  const previousMonthIndex = date.getMonth() - 1;
  const previous_month = new Date(
    date.getFullYear(),
    previousMonthIndex
  ).toLocaleString("default", { month: "long" });
  console.log("Monthly Income state:", monthlyIncome);
  return (
    <>
      <Navbar />
      <div className="dashboard text-center">
        <p className="fst-italic my-2">
          "Do not save what is left after spending, but spend what is left after
          saving."
        </p>
        <p className="sub-title fw-semibold">— Warren Buffett</p>
      </div>
      <div className="main-dashboard-content">
        <Container className="">
          <Row className="d-flex justify-content-center">
            <Col md={4} className="mb-3">
              <Card className="Cards bg-light text-dark">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Expenses in this month
                  </Card.Title>
                  <Card.Text className="card-text text-dark">
                    {totalExpense !== null ? `₹${totalExpense}` : "Loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="Cards bg-light text-dark">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Monthly Budget
                  </Card.Title>
                  <Card.Text className="card-text text-dark">
                    {budget !== null ? `₹${budget}` : "Loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="Cards bg-light text-light">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Available Budget
                  </Card.Title>
                  <Card.Text className="card-text text-dark">
                    {remainingBudget !== null
                      ? `₹${remainingBudget}`
                      : "Loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={4} className="mb-3">
              <Card className="Cards bg-light text-dark">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Savings in {previous_month}
                  </Card.Title>
                  <Card.Text className="card-text text-dark">
                    {previousSavings !== null
                      ? `₹${previousSavings}`
                      : "Loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="Cards bg-light text-dark">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Savings in {year}
                  </Card.Title>
                  <Card.Text className="card-text text-dark">
                    {remainingBudget !== null
                      ? `₹${remainingBudget}`
                      : "Loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="Cards bg-light text-dark">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Monthly Income
                  </Card.Title>
                  <Card.Text className="card-text text-dark">
                    {monthlyIncome !== undefined && monthlyIncome !== null
                      ? `₹${monthlyIncome}`
                      : "Loading..."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="data-visualization justify-content-center">
        <Charts />
      </div>
    </>
  );
};

export default Dashboard;
