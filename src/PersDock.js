import React, { useEffect, useState } from 'react';
import "./fave.css"
import { Container, Row, Col, Card, Button,Form } from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';


export const PersDock = () => {
    const [pers, setPers] = useState([]);
    const [name, setName] = useState(""); // создаем состояние для хранения значения логина
    const [phone, setPhone] = useState("");
    const doc_token = localStorage.getItem("doc_token");

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
  
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    useEffect(() => {
        console.log("Запрос:", doc_token);
        axios.get(`/api/documents/person?doc_token=${doc_token}`)
          .then((response) => {
            // Обработка успешного ответа
            console.log("Ответ сервера:", response.data);
            setPers(response.data);
            setName(response.data.fullname);
            setPhone(response.data.phone_number);
          })
          .catch((error) => {
            // Обработка ошибки
            console.error("Ошибка запроса:", error);
          });
      }, []);

    const handleSubmit = (event) => {
    const requestData = {
        "fullname": name,
        "phone_number": phone,
        };
    axios.post(`/api/documents/personalInfo?doc_token=${doc_token}`,requestData,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    })
    .then((response) => {
      // Обработка успешного ответа
      console.log("Ответ сервера:", response.data);
      setName(name);
      setPhone(phone);
      toast("Информация успешно обновлена", { autoClose: 4000 });
    })
    .catch((error) => {
      // Обработка ошибки
      console.error("Ошибка запроса:", error);
    });
    };

    const handleCancel = () => {
      // Вернуть исходные значения полей
      setName(pers.fullname);
      setPhone(pers.phone_number);
    };

    return (
        <>
        <Navibar />
        <Container>
        <ToastContainer />

            <Row className=" d-flex justify-content-center align-items-center">
            <Col xs="auto" md={8} lg={6}>
            <Card
            className="shadow px-4"
            style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "2rem",marginTop: "1rem" }}>
                <Form.Group className="mb-3" controlId="text">
                        <Form.Label className="text-center">ФИО</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Введите ФИО"
                          value={name} 
                        //   onBlur={e=>blurHandler(e)}
                          onChange={handleNameChange}
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="text">
                        <Form.Label className="text-center">Номер телефона</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Введите номер телефона"
                          value={phone} 
                        //   onBlur={e=>blurHandler(e)}
                          onChange={handlePhoneChange}
                        />
                      </Form.Group>
                      <div className="mb-2">
                        <Button variant="primary" 
                        onClick={handleSubmit}
                        >
                        Сохранить
                        </Button>{' '}
                        <Button variant="secondary" onClick={handleCancel} >
                        Отменить
                        </Button>
                    </div>
                </Card>
            </Col>
            <Col>
            <Link
                // onClick={() => handleAddClick()}
                style={{
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
                }}
                onClick={handleShow}
                >
                <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить <br/>документ</h1> {/* Заменяем marginLeft на marginRight */}
                <img
                    src="/img/edit_ico.png"
                    width="20"
                    height="30"
                    alt="Иконка редактирования"
                />
            </Link>
            </Col>
            </Row>


            <Row className=" d-flex justify-content-center align-items-center">
            <Col xs="auto" className="p-0" md={6} lg={6}>
            <Card
            className="shadow px-4"
            style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
        >
            <h2 style={{ borderBottom: "1px solid black" }}>• Паспорт •</h2>
            <Card.Body>
            <Form 
            // onSubmit={handleSubmit}
            >
                      {/* {(loginDirty) && <div style ={{color:'red'}}>{loginError}</div>} */}
                      <Form.Group className="mb-3" controlId="text">
                        <Form.Label className="text-center">ФИО</Form.Label>
                        <Form.Control
                          type="text"
                          name="login"
                          placeholder="Введите ФИО"
                          value={pers.passport?.fullname}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handleLoginChange}
                        />
                      </Form.Group>
                      {/* {(passwordDirty) && <div style ={{color:'red'}}>{passwordError}</div>} */}
                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Пол</Form.Label>
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите пол"
                          value={pers.passport?.sex}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите дату рождения"
                          value={pers.passport?.date_of_birth}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Гражданство</Form.Label>
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите гражданство"
                          value={pers.passport?.citizenship}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Серия</Form.Label>
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите серию паспорта"
                          value={pers.passport?.serial}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Номер</Form.Label>
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите номер паспорта"
                          value={pers.passport?.number}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Дата выдачи:</Form.Label>  
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите дату выдачи паспорта"
                          value={pers.passport?.date_of_given}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Кем выдан:</Form.Label>  
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите кем выдан паспорт"
                          value={pers.passport?.who_gave}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Регистрация:</Form.Label>  
                        <Form.Control
                          type="text"
                          name = "password"
                          placeholder="Введите регистрацию"
                          value={pers.passport?.registration}
                        //   onBlur={e=>blurHandler(e)}
                        //   onChange={handlePasswordChange}
                        />
                      </Form.Group>


                      <div className="mb-2"> 
                        <Button variant="primary" 
                        // onClick={handleSubmit}
                        >
                        Сохранить
                        </Button>{' '}
                        <Button variant="secondary">
                        Отменить
                        </Button>{' '}
                        <Button variant="secondary">
                        Редактировать
                        </Button>
                    </div>
                    </Form>
            </Card.Body>
            </Card>
            </Col>
            </Row>
        </Container>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
        </>
);
};