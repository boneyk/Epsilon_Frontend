import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast } from "react-bootstrap";
import axios from "axios";
import Navibar from "./components/navibar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar_man from "./components/navbar_man";


export const ManagerProf = () => {
  const [prof, setProf] = useState([]);
  const [login, setLogin] = useState(""); // создаем состояние для хранения значения логина
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // создаем состояние для хранения значения логина
  const [Instatus, setStatus] = useState(false);


  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(login === ""){
      setLogin(prof.login);
    }else if(email === ""){
      setEmail(prof.email)
    }else if(password === ""){
      const requestData = {
        "login": login,
        "email": email,
      };
      
      console.log(requestData);
      const token = localStorage.getItem("token");
      // выводим requestData в консоль (для проверки)
      axios
        .patch(`http://89.223.122.223:8080/api/users/info?token=${token}`, requestData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
        .then((response) => {
          // Обработка успешного ответа
          console.log("Ответ сервера:", response.data);
          localStorage.setItem("token", response.data.token);
          toast("Информация успешно обновлена", { autoClose: 4000 });
        })
        .catch((error) => {
          // Обработка ошибки
          console.error("Ошибка запроса:", error);
          if (error.response.status === 400) {
            toast("Войдите в личный кабинет, чтобы продолжить", { autoClose: 4000 });
          }
        });
    }else{
    const requestData = {
      "login": login,
      "email": email,
      "password":password
    };
    
    console.log(requestData);
    const token = localStorage.getItem("token");
    // выводим requestData в консоль (для проверки)
    axios
      .patch(`http://89.223.122.223:8080/api/users/info?token=${token}`, requestData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        localStorage.setItem("token", response.data.token);
        toast("Информация успешно обновлена", { autoClose: 4000 });
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
        if (error.response.status === 400) {
          toast("Войдите в личный кабинет, чтобы продолжить", { autoClose: 4000 });
        }
      });
    }
  };

  const handleCancel = () => {
    // Вернуть исходные значения полей
    setLogin(prof.login);
    setEmail(prof.email);
    console.log("Отменить:", prof.login,prof.email, login, email);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://89.223.122.223:8080/api/users/info?token=${token}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        console.log("Ответ сервера:", response.data);
        setProf(response.data);
        setLogin(response.data.login);
        setEmail(response.data.email);
        setStatus(true);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error);
      });
  }, []);

  const handleHomeClick = () => {
    localStorage.setItem("token",null);
    window.location.href = `/`;
  };

  return (
    <>
      <Navbar_man />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <ToastContainer />
        <Container></Container>
        <h2 style={{ paddingLeft: '6rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>• Личные данные •</h2>
      <Row style={{justifyContent: "center", alignItems: "center"}}>
      <Col xs="auto" className="p-0">
        <img src={`/img/avatar.png`} style={{ width: "250px", height: "250px", marginRight: "20px",marginBottom:"1rem" }} />
        </Col>
        <Col  xs="auto" className="p-0" md={8} lg={6} >
        <Card
              className="shadow px-4"
              style={{ backgroundColor: "#B8CBE9", borderColor: "#B8CBE9", marginBottom: "20px" }}
            >
          <Form.Group className="mb-3" controlId="Login">
            <Form.Label className="text-center">Login</Form.Label>
            <Form.Control
              type="text"
              name="login"
              value={login} 
              onChange={handleLoginChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
            <Form.Label className="text-center">Пароль</Form.Label>
            <Form.Control
              type="text"
              name="password"
              placeholder="Измените пароль"
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <div className="d-flex flex-column flex-sm-row justify-content-between">
          <div>
            <Button variant="primary" onClick={handleSubmit}>
              Сохранить
            </Button>{' '}
            <Button variant="secondary" onClick={handleCancel} className="mb-2 mb-sm-0">
              Отменить
            </Button>
          </div>
          <div>
          <Button variant="secondary" onClick={handleHomeClick} className="mb-3 mb-sm-3"> 
            {(Instatus === false) ? (
                <h1 style={{ fontSize: "17px"}}>
                    Войти
                </h1>
            ) : (
                <h1 style={{ fontSize: "17px"}}>
                    Выйти
                </h1>
            )}
        </Button>
          </div>
        </div>


        </Card>
        </Col>
        </Row>
        
      </Container>
    </>
  );
};
