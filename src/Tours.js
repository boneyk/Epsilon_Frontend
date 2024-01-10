import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";

export const Tours = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    axios.get("/api/tours", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      setTours(response.data); // Установка полученных данных в состояние
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
    });
  }, []);

  const handleCardClick = () => {
    window.location.replace('/api/tour/1');
  };

  return (
    <>
      <Navibar />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
        <Container></Container>
        <h2 style={{ paddingLeft: '6rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Наши туры:</h2>
        <Row style={{justifyContent: "center", alignItems: "center"}}>
          {tours.map((tour, index) => (
            <Col xs="auto" style={{paddingBottom: '1rem'}} key={index}>
              <Card style={{ width: '18rem',background:'#DDDFEB' }} onClick={handleCardClick}>
                <Card.Img src={`/img/${tour.images[0].filename}.png`} />
                <Card.Body>
                  <Card.Title>{tour.name}</Card.Title>
                  <Card.Text>{tour.tour_type}</Card.Text>
                  <Card.Text>Стоимость: {tour.price_per_one}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
