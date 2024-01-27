import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast } from "react-bootstrap";
import axios from "axios";
import Navibar from "./components/navibar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar_man from "./components/navbar_man";

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


export const ManagerAdd = () => {
const [tour, setInfo] = useState([]);
const tour_id = localStorage.getItem("tour_id");
const token = localStorage.getItem("token");


useEffect(() => {
  console.log("Запрос:", tour_id);
  axios
    .get(`/api/tours/${tour_id}?token=${token}`,{
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

const [photos, setPhotos] = useState([]);

const handleAddPhoto = (event) => {
  // Логика добавления фотографий
};

  return (
    <>
      <Navbar_man />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
        <Container></Container>
        <h2 style={{ paddingLeft: '3rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Менеджер • Редактирование тура</h2>
      <Row style={{justifyContent: "center", alignItems: "center"}}>
        <Col xs="auto" className="p-0" md={8} lg={8}>
        <Card
            className="shadow px-4"
            style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
        >
            <h2 style={{ borderBottom: "1px solid black" }}>Информация о туре</h2>
            <Card.Body>
            <div>
        <Form.Group>
          <Form.Label>Название тура:</Form.Label>
          <Form.Control
            type="text"
            value={tour?.tour?.name}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Страна:</Form.Label>
              <Form.Control
                type="text"
                value={tour?.tour?.country}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Город:</Form.Label>
              <Form.Control
                type="text"
                value={tour?.tour?.city}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Тип тура:</Form.Label>
          <Form.Control
            type="text"
            value={tour?.tour?.tour_type}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Стоимость(руб.):</Form.Label>
              <Form.Control
                type="text"
                value={tour?.tour?.price_per_one}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Вместительность(чел.):</Form.Label>
              <Form.Control
                type="text"
                value={tour?.tour?.capacity}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Описание тура:</Form.Label>
          <Form.Control
            as="textarea"
            value={tour?.tour?.description}
            readOnly
          />
        </Form.Group>
        {tour?.tour?.date?.map((date, index) => (
        <Row key={index}>
          <Col>
            <Form.Group>
              <Form.Label>Дата начала:</Form.Label>
              <Form.Control
                type="text"
                value={date.dateStart}
                // onChange={(e) => {
                //   const newDate = { ...date, dateStart: e.target.value };
                //   const newDates = [...tour.date];
                //   newDates[index] = newDate;
                //   setTour((prevTour) => ({
                //     ...prevTour,
                //     date: newDates,
                //   }));
                // }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Дата конца:</Form.Label>
              <Form.Control
                type="text"
                value={date.dateEnd}
                // onChange={(e) => {
                //   const newDate = { ...date, dateEnd: e.target.value };
                //   const newDates = [...tour.date];
                //   newDates[index] = newDate;
                //   setTour((prevTour) => ({
                //     ...prevTour,
                //     date: newDates,
                //   }));
                // }}
              />
            </Form.Group>
          </Col>
        </Row>
      ))}

        <Row>
        <Link
        // onClick={() => handleAddClick()}
        style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
            marginTop:'1rem'
        }}
        >
        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить дату</h1>
        <img
            src="/img/edit_ico.png"
            width="30"
            height="30"
            alt="Иконка редактирования"
        />
        </Link>
        <div className="mb-2"> 
                        <Button variant="primary" 
                        // onClick={handleSubmit}
                        >
                        Сохранить
                        </Button>{' '}
                        <Button variant="secondary">
                        Отменить
                        </Button>{' '}
                        <Button variant="secondary">
                        Изменить
                        </Button>
                    </div>
        </Row>
      </div>
            </Card.Body>
        </Card>
        </Col>
        </Row>

        <Row style={{justifyContent: "center", alignItems: "center"}}>
        <Col xs="auto" md={8} lg={8}>
      <Card
              className="shadow px-4"
              style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
            >
        <h2 style={{borderBottom:'1px solid black'}}>Фотографии тура:</h2>
        <Card.Body>
        <Row>
        <Col md={6}>
            <Card.Title>Добавленные фотографии</Card.Title>
            <ListGroup>
              {tour?.tour?.images?.map((photo, index) => (
                <Card.Text className="text-center" style={{background:"#F3F6FB",borderRadius: "10px",textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px"}} inline>
                    <h1 style={{ fontSize: "17px",padding:'1rem'}}>{photo.filename}</h1>
              <div style={{justifyContent: "space-end"}}>
                <img
              src={`/img/${photo.filename}.png`}
              width="40"
              height="40"
              alt="Photo icon"
              style={{marginRight:'1rem'}}
            />
                <img
                  src="/img/del_ico.png"
                  width="40"
                  height="30"
                  alt="TO icon"
                  style={{marginRight:'1rem'}}
                />
                </div>
            </Card.Text>
            ))}
            </ListGroup>
          </Col>
          <Col md={6}>
            <Card.Title>Добавить фотографию</Card.Title>
            <Form.Control type="file" onChange={handleAddPhoto} />
          </Col>
        </Row>
        </Card.Body>
        </Card>
        </Col>
        </Row>

      </Container>
    </>
  );
};
