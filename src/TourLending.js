import Image from 'react-bootstrap/Image';
import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Card, Button, Toast } from "react-bootstrap";
import Header from "./components/Header";
import axios from "axios";

export const TourLending = () => {
    const [tour, setTour] = useState([]);
    const tour_id = localStorage.getItem("tour_id");
    const token = localStorage.getItem("token");
    console.log("tour_id из хранилища:", tour_id);
    console.log("токен из хранилища:", token);

    useEffect(() => {
        axios
            .get(`/api/tours/${tour_id}?token=${token}`, {
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
        <div>
            <Header />
            <Container className="d-flex justify-content-center align-items-center">
                <Row>
                    <Image src={`/img/${tour.tour.images[1].filename}.jpg`} fluid />
                    <Container>
                        <div className="mb-2" style={{ marginTop: "3rem" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <Button variant="secondary" >
                                    Сохранить
                                </Button>

                                <h1 className="text-center" style={{ fontSize: "38px", marginTop: "3rem",marginBottom:"2rem" }}>• Описание тура •</h1>

                                <Button variant="secondary">
                                    Отменить
                                </Button>
                            </div>
                        </div>
                    </Container>
                    <Row style={{ justifyContent: "center", alignItems: "center",marginBottom:"2rem" }}>
                        <Col xs="auto" className="" md={8} lg={4}>
                            <Card
                                className="shadow px-4"
                                style={{ backgroundColor: "#B8CBE9", borderColor: "#B8CBE9", marginBottom: "20px" }}
                            >
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>{tour.tour.description}</h1>
                                <div className="mb-2">

                                </div>
                            </Card>
                        </Col>
                        <Col xs="auto" className="p-0" >
                            <Col>
                            <img src={`/img/${tour.tour.images[2].filename}.png`} style={{ width: "575px", height: "349px", marginRight: "20px", marginBottom: "1rem" }} />
                            </Col>
                            <Col>
                            <img src={`/img/${tour.tour.images[3].filename}.png`} style={{ width: "272px", height: "181px", marginRight: "20px", marginBottom: "1rem" }} />
                            <img src={`/img/${tour.tour.images[4].filename}.png`} style={{ width: "272px", height: "181px", marginRight: "20px", marginBottom: "1rem" }} />
                            </Col>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "center", alignItems: "center", borderTop:'1px solid black', borderBottom: '1px solid black', marginBottom: "2rem"}}>
                        <Col>
                            <div className="d-flex justify-content-between align-items-center">
                            <Col>
                            <h1 className="text-center" style={{ fontSize: "45px", marginTop: "3rem",marginBottom:"2rem" }}>Цена за тур:<br/>{tour.tour.price_per_one} ₽</h1>
                            </Col>
                        <Col>
                            <Button variant="secondary" className="text-center" style={{fontSize: "45px",background:"#8BB2BB",width:"300px", height: "100px", borderColor:"#8BB2BB", color: "black"}}>Купить тур</Button>
                        </Col>
                            </div>
                        </Col>
                    </Row>

                </Row>
            </Container>
        </div>
    );
};
