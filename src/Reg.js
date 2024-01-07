import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export const Reg = () => (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow px-4" style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB" }}>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Регистрация</h2>
                  <h2 className="mb-2 text-center" style={{ fontSize: '20px' }}>Осталось совсем чуть-чуть и скоро Вы сможете выбрать тур</h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Login">
                        <Form.Label className="text-center">
                          Логин
                        </Form.Label>
                        <Form.Control type="text" placeholder="Введите логин" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Введите email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Введите пароль" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label> Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Повторите пароль" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C" }}>
                          Зарегистрироваться
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