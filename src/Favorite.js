import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";

export const Favorite = () => {
  const [fave, setFave] = useState([]);
  const token = localStorage.getItem("token");
  console.log("токен из хранилища:", token);

  useEffect(() => {
    axios.get(`/api/tours/favorite?token=${token}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      setFave(response.data);
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
    });
  }, []); // Добавляем tokenString в зависимости useEffect

  const handleCardClick = (tour) => {
    localStorage.setItem("tour_id", tour.id);
    window.location.replace(`/api/tours/${tour.id}`);
  };

  return (
    <>
    <Navibar />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Главная • Избранное</h2>
      {(fave === null) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока в избранном нет туров</div>}
      <Row style={{justifyContent: "center", alignItems: "center"}}>
        {fave.map((fave, index) => (
          <Col xs="auto" style={{paddingBottom: '1rem'}} key={index}>
            <Card style={{ width: '18rem',background:'#DDDFEB' }} onClick={() => handleCardClick(fave)}>
              <Card.Img src={`/img/${fave.images[0].filename}.png`} />
              <Card.Body>
                <Card.Title>{fave.country}</Card.Title>
                <Card.Text>{fave.city}</Card.Text>{' '}
                <Card.Text>{fave.tour_type}</Card.Text>
                <Card.Text>Стоимость: {fave.price_per_one}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </>
  );
};
