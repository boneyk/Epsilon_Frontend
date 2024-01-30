import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button,Spinner,Placeholder } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { getDownloadURL, ref, listAll,
  list } from 'firebase/storage';
  import { storage } from "./firebase";

function formatPrice(number) {
  // Преобразование числа в строку и добавление разделителей для тысяч
  let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');

  // Добавление знака валюты
  return priceString;
}

export const Favorite = () => {
  const [fave, setFave] = useState([]);
  const token = localStorage.getItem("token");
  let tour_id = localStorage.getItem("tour_id");
  console.log("токен из хранилища:", token);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    axios.get(`/api/tours/favorite?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setFave(response.data);
        loadImages(response.data); // Вызов функции для загрузки изображений
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });
  }, [token]); // Добавляем token в зависимости useEffect

  const loadImages = async (toursData) => {
    const urls = [];
    for (const tour of toursData) {
      const imageName = tour.images[0].filename;
      const imagesListRef = ref(storage, 'img');
      try {
        const response = await listAll(imagesListRef);
        for (const item of response.items) {
          if (item.name === `${imageName}.png`) {
            const url = await getDownloadURL(item);
            console.log("Картинка:", url);
            urls.push(url);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке изображения', error);
      }
    }
    console.log("Картинки:", urls);
    setImageUrls(urls);
  };

  const handleCardClick = (tour) => {
    localStorage.setItem("tour_id", tour.id);
    window.location.href = `/api/tours/${tour.id}`;
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
    <Navibar />
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
      <Container></Container>
      <h2 style={{justifyContent: "center", alignItems: "center",fontSize:'25px'  }}>Главная • Избранное</h2>
      {(fave.length === 0) && <div style={{justifyContent: "center", alignItems: "center",fontSize:'25px',marginTop:"1rem",marginBottom:"18rem"}}>Пока в избранном нет туров</div>}
          <Row style={{justifyContent: "center", alignItems: "center"}}>
        {fave.map((tour, index) => (
          <Col xs="auto" style={{paddingBottom: '1rem'}} key={index}>
            <Card style={{ width: '18rem',background:'#DDDFEB',borderRadius:'3rem' }}>
            {imageUrls.length === 0 ? (
          <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={12} style={{borderRadius:'3rem',height:"17rem"}}/>
        </Placeholder>
        ) : (
          <div style={{ position: 'relative' }}>
            <Card.Img src={imageUrls[index]} />
          </div>
        )}
              <Card.Body onClick={() => handleCardClick(tour)}>
                <Card.Title>{tour.country},{tour.city}</Card.Title>
                <Card.Text>{formatPrice(tour.price_per_one)} ₽</Card.Text>
              </Card.Body>
              <Card.Footer >
              <Button style={{ display: "block", margin: "auto", backgroundColor: "#3C5A5C",borderColor: "#3C5A5C" }} onClick={() => handleDel(tour)}>
                  Удалить
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </>
  );
};
