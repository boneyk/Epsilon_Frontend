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
    const info = JSON.parse(localStorage.getItem("conf_info"));
console.log("Запрос:", info);
const [confinfo, setInfo] = useState([]);

// useEffect(() => {
//   axios
//     .post("/api/trip",info,{
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//       },
//     }).then((response) => {
//       console.log("Ответ сервера:", response.data);
//       setInfo(response.data);
//     })
//     .catch((error) => {
//       console.error("Ошибка запроса:", error);
//     });
// }, []);

const handleToClick = (tour) => {
  localStorage.setItem("doc_token",tour.token)
  window.location.replace(`/api/documents/person?doc_token=${tour.token}`);
};

const [photos, setPhotos] = useState([]);

const handleAddPhoto = (event) => {
  // Логика добавления фотографий
};

  return (
    <>
      <Navbar_man />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
        <Container></Container>
        <h2 style={{ paddingLeft: '3rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Подтверждение заказа</h2>
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
            value="Манящий город Калининград!"
            readOnly
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Страна:</Form.Label>
              <Form.Control
                type="text"
                value={confinfo.tour?.country}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Город:</Form.Label>
              <Form.Control
                type="text"
                value={confinfo.tour?.city}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Тип тура:</Form.Label>
          <Form.Control
            type="text"
            value={confinfo.date?.dateStart}
            readOnly
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Стоимость:</Form.Label>
              <Form.Control
                type="text"
                value={confinfo.tour?.country}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Вместительность:</Form.Label>
              <Form.Control
                type="text"
                value={confinfo.tour?.city}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Описание тура:</Form.Label>
          <Form.Control
            as="textarea"
            value={confinfo.tour?.description}
            readOnly
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Дата начала:</Form.Label>
              <Form.Control
                type="text"
                value={confinfo.tour?.country}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Дата конца:</Form.Label>
              <Form.Control
                type="text"
                value={confinfo.tour?.city}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Link
        // onClick={() => handleAddClick()}
        to="/api/manager/add"
        style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
            marginTop:'1rem'
        }}
        >
        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить дату</h1> {/* Заменяем marginLeft на marginRight */}
        <img
            src="/img/edit_ico.png"
            width="20"
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
                        Редактировать
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
              {/* {photos.map((photo, index) => ( */}
                <Card.Text className="text-center" style={{background:"#F3F6FB",borderRadius: "10px",textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px"}} inline>
                    <h1 style={{ fontSize: "17px",padding:'1rem'}}>ldskldfls</h1>
                {/* {confinfo.fullname} */}
                <img
                  src="/img/del_ico.png"
                  width="40"
                  height="30"
                  alt="Basket icon"
                  style={{marginRight:'1rem'}}
                />
            </Card.Text>
              {/* ))} */}
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
