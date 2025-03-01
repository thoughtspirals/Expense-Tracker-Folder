import React from "react";
import Navbar from "../Reusables/Navbar";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AiInsights = () => {
  return (
    <>
      <Navbar />

      <h2>AI Insights</h2>

      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Link to="/add-transaction" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Expense Analysis
                  </Card.Title>
                  <Card.Text>
                    Analyse your expenses and get insights on your spending from
                    our Ai
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/delete-transactions" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Delete Transactions
                  </Card.Title>
                  <Card.Text>
                    Delete your transactions here. You can delete your income
                    and expenses here
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/update-transactions" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Update Transactions
                  </Card.Title>
                  <Card.Text>
                    Update your transactions here. You can update your income
                    and expenses here.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AiInsights;
