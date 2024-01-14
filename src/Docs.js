import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { Link } from "react-router-dom";


export const Docs = () => {
  const [docs, setDocs] = useState([]);
  const token = localStorage.getItem("token");
  let tour_id = localStorage.getItem("tour_id");
  console.log("токен из хранилища:", token);

  useEffect(() => {
    axios.get(`/api/documents?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setDocs(response.data);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  }, [token]); // Добавляем token в зависимости useEffect

//   const handleCardClick = (tour) => {
//     localStorage.setItem("tour_id", tour.id);
//     window.location.replace(`/api/tours/${tour.id}`);
//   };

  const handleDel = (tour) => {
    axios
      .delete(`/api/documents?token=${token}&doc_token=${tour.token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setDocs(docs.filter(item => item.token !== tour.token));
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  };
  const handleToClick = (tour) => {
    window.location.replace(`/api/documents/person?doc_token=${tour.token}`);
  };
  const handleAddClick = (tour) => {
    axios
      .post(`/api/documents/add?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setDocs([...docs, response.data]);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  };

  return (
    <>
    <Navibar />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Главная • Личные документы туристов</h2>
      <Link
        onClick={() => handleAddClick()}
        style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
        }}
        >
        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить</h1> {/* Заменяем marginLeft на marginRight */}
        <img
            src="/img/edit_ico.png"
            width="20"
            height="30"
            alt="Иконка редактирования"
        />
        </Link>

      {(docs.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока в документах нет доступных туристов</div>}
        {docs.map((docs, index) => (
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
        <Col xs="auto" style={{ paddingBottom: '1rem' }} key={index}>
          <Card className="shadow px-4">
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
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {(docs.fullname === null) && <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  Фамилия Имя Отчество
                </h1>}
                <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                  {docs.fullname}
                </h1>
              </div>
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
                onClick={() => handleDel(docs)}
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
                  justifyContent: "space-between",
                  marginTop: "10px",
                  marginBottom: "10px"
                }}
                onClick={() => handleToClick(docs)}
              >
                <img
                  src="/img/path_to.png"
                  width="50"
                  height="40"
                  alt="Basket icon"
                />
              </Link>
            </Link>
          </Card>
        </Col>
      </Row>      
        ))}
    </Container>
  </>
  );
};
