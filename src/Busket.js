import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";

export const Busket = () => {
  const [hist, setHist] = useState([]);
  const token = localStorage.getItem("token");
  let tour_id = localStorage.getItem("tour_id");
  console.log("токен из хранилища:", token);

  useEffect(() => {
    axios.get(`/api/trip/history?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setHist(response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  }, [token]); // Добавляем token в зависимости useEffect

  const handleCardClick = (tour) => {
    localStorage.setItem("tour_id", tour.id);
    window.location.replace(`/api/tours/${tour.id}`);
  };

  return (
    <>
    <Navibar />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Главная • История покупок</h2>
      {(hist.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока в корзине нет заказов</div>}
      <Row style={{justifyContent: "center", alignItems: "center"}}>
        {hist.map((hist, index) => (
          <Col xs="auto" style={{paddingBottom: '1rem'}} key={index}>
            <Card style={{ width: '18rem',background:'#DDDFEB' }}>
              <Card.Img src={`/img/${hist.bookingEntity.tour.images[0].filename}.png`} onClick={() => handleCardClick(hist)} />
              <Card.Body onClick={() => handleCardClick(hist)}>
                <Card.Title>{hist.bookingEntity.tour.country},{hist.bookingEntity.tour.city}</Card.Title>
                <Card.Text>{hist.bookingEntity.tour.price_per_one} ₽</Card.Text>
              </Card.Body>
              <Card.Footer >
                <Card.Text>{hist.status}</Card.Text>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </>
  );
};
