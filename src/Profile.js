import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast } from "react-bootstrap";
import axios from "axios";
import Navibar from "./components/navibar";

export const Profile = () => {
  const [prof, setProf] = useState([]);
  const [login, setLogin] = useState(""); // создаем состояние для хранения значения логина
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // создаем состояние для хранения значения логина

  const token = localStorage.getItem("token");
  console.log("токен из хранилища:", token);

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
      
      console.log(requestData); // выводим requestData в консоль (для проверки)
      axios
        .patch(`/api/users/info?token=${token}`, requestData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
        .then((response) => {
          // Обработка успешного ответа
          console.log("Ответ сервера:", response.data);
          <Toast>
            <Toast.Body>Информация успешно обновлена</Toast.Body>
          </Toast>
        })
        .catch((error) => {
          // Обработка ошибки
          console.error("Ошибка запроса:", error);
        });
    }else{
    const requestData = {
      "login": login,
      "email": email,
      "password":password
    };
    
    console.log(requestData); // выводим requestData в консоль (для проверки)
    axios
      .patch(`/api/users/info?token=${token}`, requestData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        <Toast>
          <Toast.Body>Информация успешно обновлена</Toast.Body>
        </Toast>
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/api/users/info?token=${token}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        console.log("Ответ сервера:", response.data);
        setProf(response.data);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error);
      });
  }, []);

  return (
    <>
      <Navibar />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
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
              defaultValue={prof.login} 
              onChange={handleLoginChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={prof.email}
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
          <div className="mb-2">
        <Button variant="primary" onClick={handleSubmit}>
          Сохранить
        </Button>{' '}
        <Button variant="secondary">
          Отменить
        </Button>
      </div>
        </Card>
        </Col>
        </Row>
      </Container>
    </>
  );
};
