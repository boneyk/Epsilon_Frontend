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
  if (typeof number !== 'undefined' && !isNaN(number)) {
    // Преобразование числа в строку и добавление разделителей для тысяч
    let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    return priceString;
  }
}

export const MangerEdit = () => {
  const [tours, setTours] = useState([]);
  const token = localStorage.getItem("token");
  let tour_id = localStorage.getItem("tour_id");
  console.log("токен из хранилища:", token);
  

  useEffect(() => {
    axios.get(`http://89.223.122.223:8080/api/manager/${token}`)
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      setTours(response.data);
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
    });
  }, []); // Добавляем token в зависимости useEffect

//   const handleCardClick = (tour) => {
//     localStorage.setItem("tour_id", tour.id);
//     window.location.replace(`/api/tours/${tour.id}`);
//   };

  // const handleDel = (tour) => {
  //   axios
  //     .delete(`/api/documents?token=${token}&doc_token=${tour.token}`)
  //     .then((response) => {
  //       // Обработка успешного ответа
  //       console.log("Ответ сервера:", response.data);
  //       setDocs(docs.filter(item => item.token !== tour.token));
  //     })
  //     .catch((error) => {
  //       // Обработка ошибки
  //       console.error("Ошибка запроса:", error);
  //     });
  // };
  const handleToClick = (tour) => {
    localStorage.setItem("tour_id",tour.id)
  };
  const handleAddClick = () => {
    localStorage.setItem("tour_id",0)
    // axios
    //   .post(`/api/documents/add?token=${token}`)
    //   .then((response) => {
    //     // Обработка успешного ответа
    //     console.log("Ответ сервера:", response.data);
    //     const newTourist = response.data;
    //     newTourist.fullname = null; // Устанавливаем значение fullname в null
    //     setDocs([...docs, newTourist]);
    //   })
    //   .catch((error) => {
    //     // Обработка ошибки
    //     console.error("Ошибка запроса:", error);
    //     if (error.response.status === 400) {
    //       toast("Войдите в личный кабинет, чтобы продолжить", { autoClose: 4000 });
    //     }
    //   }); 
  };
  

  return (
    <>
    <Navbar_man />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
    <ToastContainer />
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Менеджер • Список актуальных туров</h2>
      {/* <Link
        onClick={() => handleAddClick()}
        to="/api/manager/add"
        style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
        }}
        >
        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить новый тур</h1> {/* Заменяем marginLeft на marginRight */}
        <img
            src="/img/edit_ico.png"
            width="30"
            height="30"
            alt="Иконка редактирования"
        />
        </Link> */}

      {(tours?.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока в документах нет доступных туров</div>}
        {tours?.map((info, index) => (
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
              to="/api/manager/add"
              onClick={() => handleToClick(info)}>
              <div style={{ alignItems: "center" }}>
                <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  {info?.name}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                {info?.tour_type}
                </h1>
                <h1 style={{ fontSize: "15px", marginLeft: "10px" }}>
                Стоимость: {formatPrice(info?.price_per_one)} ₽ 
                </h1>
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
                // onClick={() => handleDel(docs)}
              >
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
                to="/api/manager/add"
                onClick={() => handleToClick(info)}
                >
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
