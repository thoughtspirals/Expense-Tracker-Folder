import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Reusables/Navbar";
import { Card, Container, Row, Col } from "react-bootstrap";

const ManageTransactions = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Link to="/add-transaction" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Add Transactions
                  </Card.Title>
                  <Card.Text>
                    Add your transactions here. You can add your income and
                    expenses here.
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
        <Row>
          <Col md={4}>
            <Link to="/all-expenses" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    View Expenses
                  </Card.Title>
                  <Card.Text>
                    Every single transaction in one place.View all of your
                    expenses here
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/set-budget" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Set Budget
                  </Card.Title>
                  <Card.Text>
                    Setting a budget for your expenses is important. You can set
                    a budget here
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/check-budget" className="links">
              <Card className="Cards my-2">
                <Card.Body>
                  <Card.Title className="card-title text-dark">
                    Check Budget
                  </Card.Title>
                  <Card.Text>
                    Want to know how much you have spent? Check your budget here
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ManageTransactions;
