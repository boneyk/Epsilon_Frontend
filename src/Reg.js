import React, { useState,useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import axios from "axios";


export const Reg = () => {
  const [login, setLogin] = useState(""); // создаем состояние для хранения значения логина
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfassword] = useState(""); // создаем состояние для хранения значения пароля
  const [loginDirty, setLoginDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confpasswordDirty, setConfpasswordDirty] = useState(false);
  const [loginError, setLoginError] = useState("Логин не может быть пустым");
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
  const [confpasswordError, setConfpasswordError] = useState("Пароль не может быть пустым");
  const [formValid, setFormValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successError, setSuccessError] = useState("Такой пользователь уже существует");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (!loginDirty && !passwordDirty && !emailDirty && !confpasswordDirty && passwordsMatch) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [loginDirty, passwordDirty, emailDirty,confpasswordDirty,passwordsMatch]);

  const handleLoginChange = (event) => {
    setLogin(event.target.value); // обновляем состояние при изменении значения в поле ввода логина
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value); // обновляем состояние при изменении значения в поле ввода логина
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // обновляем состояние при изменении значения в поле ввода пароля
    setPasswordsMatch(event.target.value === confpassword);
  };
  const handleConfpasswordChange = (event) => {
    setConfassword(event.target.value); // обновляем состояние при изменении значения в поле ввода пароля
    setPasswordsMatch(event.target.value === password);
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
      case "email":
        if (email === "") {
          setEmailDirty(true);
        } else {
          setEmailDirty(false);
        }
        break;
      case "confpassword":
        if (confpassword === "") {
          setConfpasswordDirty(true);
        } else {
          setConfpasswordDirty(false);
        }
        break;
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      "login": login,
      "email": email,
      "password": password,
      "password_confirm": confpassword
    };
    console.log(requestData); // выводим requestData в консоль (для проверки)
    axios
      .post("/api/auth/reg", requestData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        if (response.status === 201){
          window.location.href = '/';
        }
        setSuccess(false);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
        setSuccess(true);
      });
  };

  return (
    <div>
      <Header/>
      <Container style={{paddingTop:'1rem', paddingBottom:'1rem'}}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow px-4" style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB" }}>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Регистрация</h2>
                  <h2 className="mb-2 text-center" style={{ fontSize: '20px' }}>Осталось совсем чуть-чуть и скоро Вы сможете выбрать тур</h2>
                  <div className="mb-3">
                    <Form>
                    {(loginDirty) && <div style ={{color:'red'}}>{loginError}</div>}
                      <Form.Group className="mb-3" controlId="Login">
                        <Form.Label className="text-center">
                          Логин
                        </Form.Label>
                        <Form.Control type="text"
                        name="login"
                          placeholder="Введите логин"
                          value={login}
                          onChange={handleLoginChange}
                          onBlur={e=>blurHandler(e)}/>
                      </Form.Group>

                      {(emailDirty) && <div style ={{color:'red'}}>{emailError}</div>}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" 
                        name="email"
                          placeholder="Введите email"
                          value={email}
                          onChange={handleEmailChange}
                          onBlur={e=>blurHandler(e)}
                         />
                      </Form.Group>

                      {(passwordDirty) && <div style ={{color:'red'}}>{passwordError}</div>}
                      {(passwordsMatch === false) && <div style={{ color: 'red' }}>Пароли не совпадают</div>}
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"
                        name="password"
                          placeholder="Введите пароль"
                          value={password}
                          onChange={handlePasswordChange}
                          onBlur={e=>blurHandler(e)} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                      {(confpasswordDirty) && <div style ={{color:'red'}}>{confpasswordError}</div>}
                        <Form.Label> Пароль</Form.Label>
                        <Form.Control type="password"
                        name="confpassword"
                          placeholder="Повторите пароль"
                          value={confpassword}
                          onChange={handleConfpasswordChange}
                          onBlur={e=>blurHandler(e)} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C"}} onClick={handleSubmit} disabled = {!formValid}>
                        <Link style={{ textDecoration: 'none',color: "white" }} onAbort={!success} 
                        // to="/"
                        >Зарегистрироваться</Link>
                        </Button>
                      {(success) && <div style ={{color:'red'}}>{successError}</div>}
                      </div>
                      <div className="d-grid">
                      <p className="mb-0 text-center">
                        Уже есть аккаунт?{" "}
                        <a  className="text-primary fw-bold">
                        <Link to="/" style={{ textDecoration: 'none' }}>Войти</Link>
                        </a>
                      </p>
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