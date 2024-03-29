import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast } from "react-bootstrap";
import axios from "axios";
import Navbar_man from './components/navbar_man';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function formatPrice(number) {
  // Проверка, является ли number числом
  if (typeof number !== 'number') {
    return '';
  }

  // Преобразование числа в строку и добавление разделителей для тысяч
  let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');

  // Добавление знака валюты
  return priceString;
}


export const ManagerConfInfo = () => {
    const token = localStorage.getItem("token");
    const trip_id = localStorage.getItem("trip_id");
const [info, setInfo] = useState([]);

useEffect(() => {
    axios
      .get(`/api/manager/trip/${trip_id}?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  }, []);

const handleToClick = (tour) => {
  localStorage.setItem("doc_token",tour.token)
  window.location.href = `/api/documents/person?doc_token=${tour.token}`;
};

  return (
    <>
      <Navbar_man />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
        <Container></Container>
        <h2 style={{ paddingLeft: '3rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Статус заказа: {info?.status}</h2>
      <Row style={{justifyContent: "center", alignItems: "center"}}>
      <Col xs="auto" md={8} lg={4}>
      <Card
              className="shadow px-4"
              style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
            >
        <h2 style={{borderBottom:'1px solid black'}}>Список туристов:</h2>
        <Card.Body>
        {info.person_list?.map((confinfo, index) => (
        <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onClick={() => handleToClick(confinfo)}
              >
            <Card.Text className="text-center" style={{background:"#F3F6FB",borderRadius: "10px"}}>
                {confinfo.fullname}
                <img
                  src="/img/path_to.png"
                  width="50"
                  height="40"
                  alt="Basket icon"
                />
            </Card.Text>
            </Link>
        ))} 
        </Card.Body>
        </Card>
        </Col>


        <Col xs="auto" className="p-0" md={8} lg={6}>
        <Card
            className="shadow px-4"
            style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
        >
            <h2 style={{ borderBottom: "1px solid black" }}>Информация о туре</h2>
            <Card.Body>
                <div>
                <h5>Страна:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {info.tour?.country}
                </Card.Text>
                <h5>Город:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {info.tour?.city}
                </Card.Text>
                <Col></Col>
                <h5>Дата начала:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {info.date?.dateStart}
                </Card.Text>
                <h5>Дата конца:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                  {info.date?.dateEnd}
                </Card.Text>
                <h5>Цена:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {formatPrice(info.tour?.price_per_one * info.person_list?.length)} ₽
                </Card.Text>
                <h5>Описание тура:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {info.tour?.description}
                </Card.Text>
                </div>
            </Card.Body>
        </Card>
        </Col>
        </Row>

      </Container>
    </>
  );
};
