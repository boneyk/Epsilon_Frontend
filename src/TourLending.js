import Image from 'react-bootstrap/Image';
import React, { useState, useEffect,useRef } from "react";
import { Container, Row, Form, Col, Card, Button, Toast } from "react-bootstrap";
import Header from "./components/Header";
import axios from "axios";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';


export const TourLending = () => {
    const [tourinfo, setTour] = useState([]);
    const tour_id = localStorage.getItem("tour_id");
    const token = localStorage.getItem("token");
    console.log("tour_id из хранилища:", tour_id);
    console.log("токен из хранилища:", token);
    
    const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [target1, setTarget1] = useState(null);
  const [target2, setTarget2] = useState(null);
  const ref = useRef(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/tours/${tour_id}?token=${token}`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                });
                console.log("Ответ сервера:", response.data);
                setTour(response.data);
            } catch (error) {
                console.error("Ошибка запроса:", error);
            }
        };

        fetchData();
    }, [setTour]);

    const handleAdd = (event) => {
        event.preventDefault();
        axios
          .patch(`/api/tours/favorite/${tour_id}/to/${token}`,{
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          })
          .then((response) => {
            // Обработка успешного ответа
            console.log("Ответ сервера:", response.data);
          })
          .catch((error) => {
            // Обработка ошибки
            console.error("Ошибка запроса:", error);
          });
      };

      const handleBuy = (event) => {
        event.preventDefault();
        axios
          .patch(`/api/tours/history/${tour_id}/to/${token}`,{
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          })
          .then((response) => {
            // Обработка успешного ответа
            console.log("Ответ сервера:", response.data);
          })
          .catch((error) => {
            // Обработка ошибки
            console.error("Ошибка запроса:", error);
          });
      };

    return (
        <div>
            <Header />
            {/* <Image src={`/img/${tourinfo.tour?.images[1].filename}.jpg`} fluid className="d-flex justify-content-center align-items-center"/> */}
            <Container className="d-flex justify-content-center align-items-center">
                <Row>
                    <Image src={`/img/${tourinfo.tour?.images[1].filename}.jpg`} fluid />
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop:'1rem', marginBottom:'1rem' }}>
                            <h1 style={{ fontSize: "38px", margin: "0" }}>• Описание тура •</h1>
                        </div>
                        <Button variant="secondary" onClick={handleAdd}>
                            Добавить в избранное
                        </Button>
                    <Row style={{ justifyContent: "center", alignItems: "center",marginBottom:"2rem" }}>
                        <Col xs="auto" className="" md={8} lg={4}>
                            <Card
                                className="shadow px-4"
                                style={{ backgroundColor: "#B8CBE9", borderColor: "#B8CBE9", marginBottom: "20px" }}
                            >
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>{tourinfo.tour?.name}</h1>
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>Город:<br/>{tourinfo.tour?.city}</h1>
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>Тип тура:<br/>{tourinfo.tour?.tour_type}</h1>
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>Описание тура:<br/>{tourinfo.tour?.description}</h1>
                                <div className="mb-2">

                                </div>
                            </Card>
                        </Col>
                        <Col xs="auto" className="p-0" >
                            <Col>
                            <img src={`/img/${tourinfo.tour?.images[2].filename}.png`} style={{ width: "575px", height: "349px", marginRight: "20px", marginBottom: "1rem" }} />
                            </Col>
                            <Col>
                            <img src={`/img/${tourinfo.tour?.images[3].filename}.png`} style={{ width: "272px", height: "181px", marginRight: "20px", marginBottom: "1rem" }} />
                            <img src={`/img/${tourinfo.tour?.images[4].filename}.png`} style={{ width: "272px", height: "181px", marginRight: "20px", marginBottom: "1rem" }} />
                            </Col>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "center", alignItems: "center", borderTop:'1px solid black', borderBottom: '1px solid black', marginBottom: "2rem"}}>
                        <Col>
                            <div className="d-flex justify-content-between align-items-center">
                            <Col>
                            <h1 className="text-center" style={{ fontSize: "45px", marginTop: "3rem",marginBottom:"2rem" }}>Цена за тур:<br/>{tourinfo.tour?.price_per_one} ₽</h1>
                            </Col>
                        <Col>
                            <Button variant="secondary" className="text-center" style={{fontSize: "45px",background:"#8BB2BB",width:"300px", height: "100px", borderColor:"#8BB2BB", color: "black"}} onClick={handleBuy}>
                                Купить тур
                            </Button>
                        </Col>
                            </div>
                        </Col>
                    </Row>

                    {/* <Container>
                        <div className="mb-2">
                            <div className="d-flex justify-content-center align-items-center">
                                <h1 className="text-center" style={{ fontSize: "38px", marginTop: "1rem",marginBottom:"2rem" }}>• Туристы •</h1>
                                {tourinfo.map((type) => (
                                    <Form key={{type.persons.token}} className="mb-3">
                                        <Form.Check
                                            type={type}
                                            id={{type.persons.token}}
                                            label={{type.persons.token}}
                                        />
                                    </Form>
                                ))}
                            </div>
                        </div>
                    </Container> */}


                </Row>
            </Container>
        </div>
    );
};
