import Image from 'react-bootstrap/Image';
import React, { useState, useEffect,useRef } from "react";
import { Container, Row, Form, Col, Card, Button, Toast } from "react-bootstrap";
import Header from "./components/Header";
import axios from "axios";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { Link } from "react-router-dom";


export const TourLending = () => {
    const [tourinfo, setTour] = useState([]);
    const tour_id = localStorage.getItem("tour_id");
    const token = localStorage.getItem("token");
    console.log("tour_id из хранилища:", tour_id);
    console.log("токен из хранилища:", token);
    const [selectedPers, setSelectedPers] = useState([]);

    
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
        console.log("Ответ pers:", selectedPersons); 
        console.log("Ответ date:", selectedDate);
        const requestData = {
            "date_id": selectedDate,
            "tour_id": tour_id,
            "token": token,
            "person_list": selectedPersons
          };
          // Преобразование в строку и сохранение в localStorage
        if(selectedDate !== null || selectedPersons !== null){
            localStorage.setItem("conf_info", JSON.stringify(requestData));
            console.log("Запрос:", localStorage.getItem("conf_info"));
            window.location.replace(`/api/trip`);
        }
      };
        
      const [selectedDate, setSelectedDate] = useState(null);

      const handleDateChange = (e, token) => {
        const selDate = e.target.id;
        // Записываем выбранное значение в переменную или состояние
        setSelectedDate(selDate);
        console.log("Ответ date:", e.target.id);
      };
    

      const [selectedPersons, setSelectedPersons] = useState([]);

      const handlePersChange = (e, token, fullname) => {
        // Проверяем, был ли вариант выбран или снят с выбора
        if (e.target.checked) {
          // Добавляем выбранный вариант в список
          setSelectedPersons((prevSelectedPersons) => [
            ...prevSelectedPersons,
            { token, fullname },
          ]);
        } else {
          // Удаляем выбранный вариант из списка
          setSelectedPersons((prevSelectedPersons) =>
            prevSelectedPersons.filter((person) => person.token !== token)
          );
        }
      };
      
      

    return (
        <div>
            <Header />
            {/* <Image src={`/img/${tourinfo.tour?.images[1].filename}.jpg`} fluid className="d-flex justify-content-center align-items-center"/> */}
            <Container className="d-flex justify-content-center align-items-center">
                <Row>
                    <Image src={`/img/${tourinfo.tour?.images[1].filename}.jpg`} fluid />
                        <Link
                            onClick={handleAdd}
                            style={{
                                textDecoration: "none",
                                color: "black",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
                                marginTop:'1rem'
                            }}
                            >
                            <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить в избранное</h1> {/* Заменяем marginLeft на marginRight */}
                            <img
                                src="/img/edit_ico.png"
                                width="20"
                                height="30"
                                alt="Иконка редактирования"
                            />
                            </Link>
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop:'1rem', marginBottom:'1rem' }}>
                            <h1 style={{ fontSize: "38px", margin: "0" }}>• Описание тура •</h1>
                        </div>
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

                    <Row>
                    <div className="mb-2">
                        <div className="d-flex flex-column align-items-center">
                        <h1
                            className="text-center"
                            style={{
                            fontSize: "38px",
                            marginTop: "1rem",
                            marginBottom: "2rem",
                            }}
                        >
                            • Туристы •
                            {tourinfo.persons?.map((type) => (
                            <Form
                                key={type.token}
                                className="mb-3"
                                style={{
                                fontSize: "30px",
                                marginTop: "1rem",
                                }}
                            >
                                <Form.Check
                                type="checkbox"
                                id={type.token}
                                label={type.fullname}
                                checked={selectedPersons.some(
                                    (person) => person.token === type.token
                                )}
                                onChange={(e) =>
                                    handlePersChange(e, type.token, type.fullname)
                                }
                                style={{
                                    backgroundColor: "#DDDFEB",
                                    borderColor: "#DDDFEB",
                                    fontSize: "24px",
                                    padding: "10px",
                                    position: "relative",
                                    paddingLeft: "40px",
                                    borderRadius: "10px",
                                }}
                                />
                            </Form>
                            ))}
                        </h1>
                        </div>
                    </div>
                    </Row>



                    <Row>
                    <div className="mb-2">
                        <div className="d-flex flex-column align-items-center">
                        <h1 className="text-center" style={{ fontSize: "38px", marginTop: "1rem", marginBottom: "2rem" }}>• Даты •
                            {tourinfo.tour?.date?.map((type) => (
                            <Form key={type.dateStart} className="mb-3" style={{ fontSize: "30px", marginTop: "1rem"}}>
                                <Form.Check
                                type="checkbox" // Изменяем тип на "radio"
                                id={type.id}
                                name="group1"
                                label={`c ${type.dateStart} по ${type.dateEnd}`}
                                checked={type.checked} // Добавьте состояние checked
                                onChange={(e) => handleDateChange(e, type.token)} // Добавьте обработчик изменения состояния для радиокнопок
                                style={{
                                    backgroundColor: "#DDDFEB",
                                    borderColor: "#DDDFEB",
                                    fontSize: "24px",
                                    padding: "10px",
                                    position: "relative",
                                    paddingLeft: "40px", // Увеличиваем отступ слева для включения фонового поля
                                    borderRadius: "10px", // Добавляем закругление углов
                                }}
                                />
                            </Form>
                            ))}
                        </h1>
                        </div>
                    </div>
                    </Row>





                    <Row style={{ justifyContent: "center", alignItems: "center", borderTop:'1px solid black', borderBottom: '1px solid black', marginBottom: "2rem"}}>
                        <Col>
                            <div className="d-flex justify-content-between align-items-center">
                            <Col>
                            <h1 className="text-center" style={{ fontSize: "45px", marginTop: "3rem",marginBottom:"2rem" }}>Цена за тур:<br/>{tourinfo.tour?.price_per_one} ₽</h1>
                            </Col>
                        <Col>
                            <Button variant="secondary" className="text-center" style={{fontSize: "45px",background:"#8BB2BB",width:"300px", height: "100px", borderColor:"#8BB2BB", color: "black"}}
                             onClick={handleBuy}
                             >
                                Купить тур
                            </Button>
                        </Col>
                            </div>
                        </Col>
                    </Row>






                </Row>
            </Container>
        </div>
    );
};
