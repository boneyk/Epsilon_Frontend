import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./components/Header";

export const Login = () => (
  <div>
    <Header/>
    <Container style={{paddingTop:'1rem', paddingBottom:'1rem'}}>
      <Row className=" d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow px-4" style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB" }}>
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase">
                  Вход
                </h2>
                <h2 className="mb-2 text-center" style={{ fontSize: '20px' }}>Для продолжения Вам необходимо войти или зарегистрироваться</h2>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="Login">
                      <Form.Label className="text-center">Login</Form.Label>
                      <Form.Control type="text" placeholder="Enter Login" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <div className="d-grid mb-3">
                      
                        <Button variant="primary" type="submit" style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C" }}>
                        <Link to="api/tours" style={{ textDecoration: 'none',color: "white" }}>Вход</Link>
                        </Button>
                      
                    </div>

                    <div className="d-grid mb-3">
                        <Button variant="primary" type="submit" style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C" }}>
                        <Link to="api/reg" style={{ textDecoration: 'none',color: "white" }}>Регистрация</Link>
                        </Button>
                    
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);
