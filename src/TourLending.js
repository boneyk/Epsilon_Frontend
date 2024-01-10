import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";

export const TourLending = () => {
    const [tour, setTour] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tour/1", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        console.log("Ответ сервера:", response.data);
        setTour(response.data);
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error);
      });
  }, []);
    return (
        <Container>
            
        </Container>
    );
};