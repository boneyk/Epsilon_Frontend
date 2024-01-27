import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar_man from './components/navbar_man';


function formatPrice(number) {
  // Преобразование числа в строку и добавление разделителей для тысяч
  let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');

  // Добавление знака валюты
  return priceString;
}

export const ManagerFree = () => {
  const [info, setInfo] = useState([]);
  const [elem, setElem] = useState([]);
  const token = localStorage.getItem("token");
  console.log("токен из хранилища:", token);
  

  useEffect(() => {
    axios.get(`/api/manager?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
    axios.get(`/api/manager/${token}`)
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      setElem(response.data);
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
    });
  }, [info,elem]); // Добавляем token в зависимости useEffect

  const handleDelClick = (tour) => {
    localStorage.setItem("tour_id", tour.id);
    const tour_id = localStorage.getItem("tour_id");
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/manager/${token}/from/${tour_id}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        toast("Тур удален из кураторства!", { autoClose: 4000 });
       
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
        if (error.response.status === 400) {
          toast("Войдите в личный кабинет, чтобы продолжить", { autoClose: 4000 });
        }
      });
  };

  const handleToClick = (tour) => {
    localStorage.setItem("tour_id",tour.id)
  };
  const handleAddClick = (tour) => {
    localStorage.setItem("tour_id", tour.id);
    const tour_id = localStorage.getItem("tour_id");
    const token = localStorage.getItem("token");
    axios
      .post(`/api/manager/${token}/to/${tour_id}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        toast("Тур добавлен в кураторство!", { autoClose: 4000 });
       
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
        if (error.response.status === 400) {
          toast("Войдите в личный кабинет, чтобы продолжить", { autoClose: 4000 });
        }
      }); 
    // window.location.replace(`api/manager/add`);
  };
  

  return (
    <>
    <Navbar_man />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
    <ToastContainer />
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Менеджер • Список туров под кураторством</h2>
      {(elem.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока у менеджера нет доступных для кураторства туров</div>}
      {elem?.map((tour1, index1) => (
        <Row style={{ justifyContent: "center", alignItems: "center",marginTop:'1rem' }}>
        <Col xs="auto" style={{ paddingBottom: '1rem' }} 
        key={index1} 
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
              // onClick={() => handleToClick(tour1)}
              // to="/api/manager/add"
              >
              <div style={{ alignItems: "center" }}>
                {/* {(info.fullname === null) && <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  Нажмите, чтобы заполнить
                </h1>} */}
                <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  {tour1?.name}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                {tour1?.tour_type}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                Стоимость: {formatPrice(tour1?.price_per_one)}  ₽
                </h1>
                <Button style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C",justifyContent:"center" }} 
                 onClick={() => handleDelClick(tour1)}>
                    Прекратить курировать
                </Button>
              </div>
              </Link>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
                onClick={() => handleToClick(tour1)}
              to="/api/manager/add">
                <img
                  src="/img/path_to.png"
                  width="50"
                  height="40"
                  alt="Basket icon"
                />
              </Link>
              </div>
              </div>
          </Card>
        </Col>
      </Row>      
      ))} 
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Менеджер • Список свободных туров</h2>
      {/* {(docs.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока в документах нет доступных туристов</div>} */}
        {info?.map((tour, index2) => (
        <Row style={{ justifyContent: "center", alignItems: "center",marginTop:'1rem' }}>
        <Col xs="auto" style={{ paddingBottom: '1rem' }} 
        key={index2} 
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
              // onClick={() => handleToClick(tour)}
              // to="/api/manager/add"
              >
              <div style={{ alignItems: "center" }}>
                {/* {(info.fullname === null) && <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  Нажмите, чтобы заполнить
                </h1>} */}
                <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  {tour?.name}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                {tour?.tour_type}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                Стоимость: {formatPrice(tour?.price_per_one)}  ₽
                </h1>
                <Button style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C",justifyContent:"center" }} 
                 onClick={() => handleAddClick(tour)}>
                    Курировать
                </Button>
              </div>
              </Link>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
                onClick={() => handleToClick(tour)}
              to="/api/manager/add">
                <img
                  src="/img/path_to.png"
                  width="50"
                  height="40"
                  alt="Basket icon"
                />
              </Link>
              </div>
              </div>
          </Card>
        </Col>
      </Row>      
      ))} 
    </Container>
  </>
  );
};
