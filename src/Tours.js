import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card,Button,Form,Navbar, Tab,Tabs  } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputGroup from 'react-bootstrap/InputGroup';


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

  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [nights, setNights] = useState('');
  const [tourists, setTourists] = useState('');

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
  }, []);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`api/tours/filtered?country_to=${destination}&date_start=${departureDate}&nights=${nights}&amount=${tourists}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      setTours(response.data);
      setTours(response.data); 
      setDestination(""); 
      setDepartureDate(""); 
      setNights(""); 
      setTourists(""); 
    }).catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
    });
  };

  return (
    <>
      <Navibar />
      <Container style={{ background: '#739DCD', marginBottom: '1rem', marginTop: '1rem' }} >
      <h2 style={{ paddingLeft: '4rem', justifyContent: "center", alignItems: "center", paddingTop: '1rem' }}>Путешествуйте с нами!</h2>
      <Navbar collapseOnSelect expand="lg"  className="justify-content-between" style={{ background: '#B8CBE9', display: "flex", alignItems: "center", justifyContent: "flex-center", marginBottom: '1rem', marginTop: '1rem' }}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="ml-auto">
        <Form inline style={{ marginLeft: '4rem', display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
          <Row>
            <Col xs="auto">
              <InputGroup className="mb-3 mt-3" style={{ maxWidth: '14rem' }}>
                <InputGroup.Text id="basic-addon1">Куда:</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs="auto">
              <InputGroup className="mb-3 mt-3" style={{ maxWidth: '16rem' }}>
                <InputGroup.Text id="basic-addon1">Дата вылета:</InputGroup.Text>
                <Form.Control
                  // type="text"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs="auto">
              <InputGroup className="mb-3 mt-3" style={{ maxWidth: '14rem' }}>
                <InputGroup.Text id="basic-addon1">Ночи:</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs="auto">
              <InputGroup className="mb-3 mt-3" style={{ maxWidth: '14rem' }}>
                <InputGroup.Text id="basic-addon1">Туристы:</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={tourists}
                  onChange={(e) => setTourists(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs="auto" className="mb-3 mt-3">
              <Button type="submit" style={{ background: '#3C5A5C' }}>Подобрать</Button>
            </Col>
          </Row>
        </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>




      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <ToastContainer />
        <Container></Container>
        {/* <h2 style={{ paddingLeft: '6rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Наши туры:</h2> */}
        <Row style={{justifyContent: "center", alignItems: "center"}}>
          {tours?.map((tour, index) => (
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