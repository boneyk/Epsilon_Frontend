import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function formatPrice(number) {
  // Преобразование числа в строку и добавление разделителей для тысяч
  let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');

  // Добавление знака валюты
  return priceString;
}

export const Tours = () => {
  const [tours, setTours] = useState([]);
  const [status, setStatus] = useState(localStorage.getItem("token") !== null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("токен:", token);
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
  }, [token]);

  const handleCardClick = (tour) => {
    // (token === null) ? setStatus(false) : setStatus(true);
    console.log("Статус и токен:", status,);
    if(status === false){
      toast("Войдите в личный кабинет, чтобы продолжить", { autoClose: 4000 });
    }else{
      localStorage.setItem("tour_id", tour.id);
      window.location.replace(`/api/tours/${tour.id}`);
    }
  };

  return (
    <>
      <Navibar />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <ToastContainer />
        <Container></Container>
        <h2 style={{ paddingLeft: '6rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Наши туры:</h2>
        <Row style={{justifyContent: "center", alignItems: "center"}}>
          {tours.map((tour, index) => (
            <Col xs="auto" style={{paddingBottom: '1rem'}} key={index}>
              <Card style={{ width: '18rem',background:'#DDDFEB' }} onClick={() => handleCardClick(tour)}>
                <Card.Img src={`/img/${tour.images[0].filename}.png`} />
                <Card.Body>
                  <Card.Title>{tour.name}</Card.Title>
                  <Card.Text>{tour.tour_type}</Card.Text>
                  <Card.Text>Стоимость: {formatPrice(tour.price_per_one)} ₽</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};