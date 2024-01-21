import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import Navbar_man from './components/navbar_man';

function formatPrice(number) {
  // Преобразование числа в строку и добавление разделителей для тысяч
  let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');

  // Добавление знака валюты
  return priceString;
}

export const ManagerMain = () => {
  const [fave, setFave] = useState([]);
  const token = localStorage.getItem("token");
  let tour_id = localStorage.getItem("tour_id");
  console.log("токен из хранилища:", token);

//   useEffect(() => {
//     axios.get(`/api/tours/favorite?token=${token}`)
//       .then((response) => {
//         // Обработка успешного ответа
//         console.log("Ответ сервера:", response.data);
//         setFave(response.data);
//       })
//       .catch((error) => {
//         // Обработка ошибки
//         console.error("Ошибка запроса:", error);
//       });
//   }, [token]); // Добавляем token в зависимости useEffect

  const handleCardClick = (tour) => {
    localStorage.setItem("tour_id", tour.id);
    window.location.replace(`/api/tours/${tour.id}`);
  };

  const handleDel = (tour) => {
    axios
      .delete(`/api/tours/favorite/${tour.id}/from/${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setFave(fave.filter(item => item.id !== tour.id));
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  };

  return (
    <>
    <Navbar_man />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Менеджер • Обработка заявок на покупку</h2>
      {/* {(fave.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Пока в нет туров на подтверждение</div>} */}
      <Row style={{justifyContent: "center", alignItems: "center"}}>
        {/* {fave.map((tour, index) => ( */}
          <Col xs="auto" style={{paddingBottom: '1rem'}}
        //    key={index}
           >
            <Card style={{ width: '18rem',background:'#DDDFEB' }}>
              <Card.Img 
              src={`/img/egyptanoubis.png`} 
            //   onClick={() => handleCardClick(tour)} 
              />
              <Card.Body 
            //   onClick={() => handleCardClick(tour)}
              >
                <Card.Title>
                    login_name
                    {/* {tour.login} */}
                    </Card.Title>
                <Card.Text>
                    tour.country,tour.city
                    {/* {tour.country},{tour.city} */}
                </Card.Text>
                <Card.Text>
                    tour.price_per_one
                    {/* {formatPrice(tour.price_per_one)} ₽ */}
                    </Card.Text>
              </Card.Body>
              <Card.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C" }}>
                    Отказать
                </Button>
                <Button style={{ backgroundColor: "#3C5A5C", borderColor: "#3C5A5C" }}>
                    Одобрить
                </Button>
                </Card.Footer>
            </Card>
          </Col>
        {/* ))} */}
      </Row>
    </Container>
  </>
  );
};
