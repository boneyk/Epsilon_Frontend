import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button, CardFooter } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import Navbar_man from './components/navbar_man';
import { Link } from "react-router-dom";


function formatPrice(number) {
  // Преобразование числа в строку и добавление разделителей для тысяч
  if (typeof number !== null ) {
    // Преобразование числа в строку и добавление разделителей для тысяч
    let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    return priceString;
  }
}


export const ManagerMain = () => {
  const [fave, setFave] = useState([]);
  const [status, setStatus] = useState("MODERATION");
  const token = localStorage.getItem("token");
  let tour_id = localStorage.getItem("tour_id");
  console.log("токен из хранилища:", token);

  useEffect(() => {
    axios.get(`/api/manager/${token}/trips`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setFave(response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  }, []); // Добавляем token в зависимости useEffect

  const handleToClick = (tour) => {
    localStorage.setItem("trip_id",tour.id);
    window.location.href = `/api/manager/conf`;
  };


  const handleConfClick = (tour) => {
    const decision = true;
    axios
      .post(`/api/manager?token=${token}&decision=${decision}&trip_id=${tour.id}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
      setStatus("ACCEPTED");
  };

  const handleDel = (tour) => {
    const decision = false;
    axios
      .post(`/api/manager?token=${token}&decision=${decision}&trip_id=${tour.id}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
      setStatus("DENIED");
  };

  return (
    <>
    <Navbar_man />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Менеджер • Обработка заявок на покупку</h2>
      {(fave.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока нет туров на подтверждение</div>}
      {fave?.map((tour, index) => (
      <Row style={{ justifyContent: "center", alignItems: "center" }}>
        <Col xs="auto" style={{ paddingBottom: '1rem' }} 
        key={index} 
        md={8} lg={6}>
          <Card className="shadow px-4" style={{background: "#DDDFEB"}}>
            <div style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px"
              }}>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px"
              }}
              // to="/api/manager/add"
              onClick={() => handleToClick(tour)}
              >
              <div style={{ alignItems: "center" }}>
                <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  Логин пользователя: {tour?.login}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                {tour?.country}, {tour?.city}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                Стоимость: {formatPrice(tour?.price)} ₽ 
                </h1>
                {/* <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                Статус заказа: {status} 
                </h1> */}
              </div>
              </Link>
              </div>
              <CardFooter style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginTop: "10px",
                  marginBottom: "10px"
                }}
                onClick={() => handleDel(tour)}
              >
                Отказать
                <img
                  src="/img/del_ico.png"
                  width="40"
                  height="30"
                  alt="Delete icon"
                />
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginTop: "10px",
                  marginBottom: "10px"
                }}
                onClick={() => handleConfClick(tour)}
                >Одобрить
                <img
                  src="/img/conf.png"
                  width="40"
                  height="40"
                  alt="Basket icon"
                />
              </Link>
              </CardFooter>
          </Card>
        </Col>
      </Row>    
        ))}  
    </Container>
  </>
  );
};
