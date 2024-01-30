import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast } from "react-bootstrap";
import axios from "axios";
import Navibar from "./components/navibar";
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

export const Confirm = () => {
    const info = JSON.parse(localStorage.getItem("conf_info"));
console.log("Запрос:", info);
const [confinfo, setInfo] = useState([]);

useEffect(() => {
  axios
    .post("http://89.223.122.223:8080/api/trip",info,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => {
      console.log("Ответ сервера:", response.data);
      setInfo(response.data);
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    });
}, []);

const handleBuy = (event) => {
  event.preventDefault();
  axios
    .post("http://89.223.122.223:8080/api/trip/add",info,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      toast("Спасибо за покупку! Ваш заказ перемещен в обработку. Зайдите в Профиль в раздел История заказов, чтобы проверить информацию", { autoClose: 5000 });
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
      toast("К сожалению, возникла ошибка с подтверждением тура", { autoClose: 5000 });
    });
};

const handleToClick = (tour) => {
  localStorage.setItem("doc_token",tour.token)
  window.location.href = `/api/documents/person?doc_token=${tour.token}`;
};
    

  return (
    <>
      <Navibar />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
        <Container></Container>
        <h2 style={{ paddingLeft: '3rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Подтверждение заказа</h2>
      <Row style={{justifyContent: "center", alignItems: "center"}}>
      <Col xs="auto" md={8} lg={4}>
      <Card
              className="shadow px-4"
              style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
            >
        <h2 style={{borderBottom:'1px solid black'}}>Список туристов:</h2>
        <Card.Body>
        {confinfo.person_list?.map((confinfo, index) => (
          <div> 
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
            </div>
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
                    {confinfo.tour?.country}
                </Card.Text>
                <h5>Город:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {confinfo.tour?.city}
                </Card.Text>
                <Col></Col>
                <h5>Дата начала:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {confinfo.date?.dateStart}
                </Card.Text>
                <h5>Дата конца:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                  {confinfo.date?.dateEnd}
                </Card.Text>
                <h5>Цена:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {formatPrice(confinfo.tour?.price_per_one * confinfo.person_list?.length)} ₽
                </Card.Text>
                <h5>Описание тура:</h5>
                <Card.Text className="text-center" style={{ background: "#F3F6FB", borderRadius: "10px" }}>
                    {confinfo.tour?.description}
                </Card.Text>
                </div>
            </Card.Body>
        </Card>
        </Col>
        </Row>


        <Row style={{ marginLeft: '1rem' }} className="justify-content-center">
        <Button
            variant="secondary"
            className="text-center"
            style={{
            fontSize: "30px",
            background: "#8BB2BB",
            width: "250px",
            height: "100px",
            borderColor: "#8BB2BB",
            color: "black",
            marginTop: '1rem'
            }}
        onClick={handleBuy}
        >
            Подтвердить
        </Button>
        <ToastContainer />
        </Row>

      </Container>
    </>
  );
};
