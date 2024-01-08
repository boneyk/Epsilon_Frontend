import React, { useState,setErrorMessage, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";

export const Login = () => {
  const [login, setLogin] = useState("");
const [password, setPassword] = useState("");
const [loginDirty, setLoginDirty] = useState(false);
const [passwordDirty, setPasswordDirty] = useState(false);
const [loginError, setLoginError] = useState("Логин не может быть пустым");
const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
const [formValid, setFormValid] = useState(false);

useEffect(() => {
  if (!loginDirty && !passwordDirty) {
    setFormValid(true);
  } else {
    setFormValid(false);
  }
}, [loginDirty, passwordDirty]);

const handleLoginChange = (event) => {
  setLogin(event.target.value);
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const blurHandler = (e) => {
  switch (e.target.name) {
    case "login":
      if (login === "") {
        setLoginDirty(true);
      } else {
        setLoginDirty(false);
      }
      break;
    case "password":
      if (password === "") {
        setPasswordDirty(true);
      } else {
        setPasswordDirty(false);
      }
      break;
  }
};


  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      "login": login,
      "password": password,
    };
    console.log(requestData); // выводим requestData в консоль (для проверки)
    axios
      .post("/api/auth", requestData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  };

  return (
    <div>
      <Header />
      <Container style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card
              className="shadow px-4"
              style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB" }}
            >
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase">
                    Вход
                  </h2>
                  <h2
                    className="mb-2 text-center"
                    style={{ fontSize: "20px" }}
                  >
                    Для продолжения Вам необходимо войти или зарегистрироваться
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      {(loginDirty) && <div style ={{color:'red'}}>{loginError}</div>}
                      <Form.Group className="mb-3" controlId="Login">
                        <Form.Label className="text-center">Login</Form.Label>
                        <Form.Control
                          type="text"
                          name="login"
                          placeholder="Введите логин"
                          value={login}
                          onBlur={e=>blurHandler(e)}
                          onChange={handleLoginChange}
                        />
                      </Form.Group>
                      {(passwordDirty) && <div style ={{color:'red'}}>{passwordError}</div>}
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name = "password"
                          placeholder="Введите пароль"
                          value={password}
                          onBlur={e=>blurHandler(e)}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <div className="d-grid mb-3">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            backgroundColor: "#3C5A5C",
                            borderColor: "#3C5A5C",
                          }} onClick={handleSubmit}
                          disabled = {!formValid}
                        >
                          <Link
                            to="api/tours"
                            style={{
                              textDecoration: "none",color: "white",
                            }}
                          >
                            Вход
                          </Link>
                        </Button>
                      </div>

                      <div className="d-grid mb-3">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            backgroundColor: "#3C5A5C",
                            borderColor: "#3C5A5C",
                          }}
                        >
                          <Link
                            to="api/reg"
                            style={{
                              textDecoration: "none",
                              color: "white",
                            }}
                          >
                            Регистрация
                          </Link>
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
};

