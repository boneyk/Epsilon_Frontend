import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast } from "react-bootstrap";
import axios from "axios";
import Navibar from "./components/navibar";

export const Profile = () => {
  const [prof, setProf] = useState([]);
  const [login, setLogin] = useState(""); // создаем состояние для хранения значения логина
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // создаем состояние для хранения значения логина
  const [phone, setPhone] = useState("");

  const token = localStorage.getItem("token");
  console.log("токен из хранилища:", token);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      "fullname": name,
      "phone_number": phone
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
      <h1 style={{ marginLeft: "2rem", marginTop:'1rem' }}>• Личные данные •</h1>
      <Container style={{ display: "flex", alignItems: "center" }}>
      <Row className=" d-flex justify-content-center align-items-center">
      <Col md={4} lg={6} xs={12}>
        <img src={`/img/avatar.png`} style={{ width: "350px", height: "350px", marginRight: "20px" }} />
        </Col>
        <Col md={8} lg={6} xs={12}>
        <Card
              className="shadow px-4"
              style={{ backgroundColor: "#B8CBE9", borderColor: "#B8CBE9", width:"700px", marginBottom: "20px" }}
            >
          <Form.Group className="mb-3" controlId="Login">
            <Form.Label className="text-center">ФИО</Form.Label>
            <Form.Control
              type="text"
              name="name"
              defaultValue={prof.fullname}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Login">
            <Form.Label className="text-center">Login</Form.Label>
            <Form.Control
              type="text"
              name="login"
              defaultValue={prof.login}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              defaultValue={prof.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Login">
            <Form.Label className="text-center">Номер телефона</Form.Label>
            <Form.Control
              type="text"
              name="login"
              defaultValue={prof.phone_number}
              onChange={handlePhoneChange}
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
