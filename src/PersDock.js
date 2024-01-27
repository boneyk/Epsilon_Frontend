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

    const [fio, setFio] = useState(""); // создаем состояние для хранения значения логина
    const [sex, setSex] = useState("");
    const [dateB, setDateB] = useState("");
    const [citez, setCitez] = useState("");
    const [seria, setSeria] = useState("");
    const [number, setNumber] = useState("");
    const [dateG, setDateG] = useState("");
    const [whoG, setWhoG] = useState("");
    const [reg, setReg] = useState("");

    const handleFioChange = (event) => {
      const { value } = event.target;
      if (/^[А-Яа-яЁё\s\-]*$/.test(value)) {
        setFio(value);
      }
    };
    
    const handleSexChange = (event) => {
      const { value } = event.target;
      if (value === "Мужской" || value === "Женский") {
        setSex(value);
      }
    };
    
    const handleDateBChange = (event) => {
      const { value } = event.target;
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setDateB(value);
      }
    };
    
    const handleCitezChange = (event) => {
      const { value } = event.target;
      if (/^[А-Яа-яЁё\s\-]*$/.test(value)) {
        setCitez(value);
      }
    };
    
    const handleSeriaChange = (event) => {
      const { value } = event.target;
      if (/^[\d+\-\s]*$/.test(value)) {
        setSeria(value);
      }
    };
    
    const handleNumberChange = (event) => {
      const { value } = event.target;
      if (/^[\d+\-\s]*$/.test(value)) {
        setNumber(value);
      }
    };
    
    const handleDateGChange = (event) => {
      const { value } = event.target;
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setDateG(value);
      }
    };
    
    const handleWhoGChange = (event) => {
      const { value } = event.target;
      if (/^[А-Яа-яЁё\s\-]*$/.test(value)) {
        setWhoG(value);
      }
    };
    
    const handleRegChange = (event) => {
      const { value } = event.target;
      if (/^[А-Яа-яЁё\s\-]*$/.test(value)) {
        setReg(value);
      }
    };
    
    

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    // Валидация ФИО: только кириллица, пробелы и дефисы
    if (/^[А-Яа-яЁё\s\-]*$/.test(newName)) {
      setName(newName);
    }
  };
  
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    // Валидация номера телефона: только цифры, знак плюса и дефис
    if (/^[\d+\-\s]*$/.test(newPhone)) {
      setPhone(newPhone);
    }
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

    const handleSubmitPersInfo = (event) => {
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

    const handleSubmitPass = (event) => {
      const requestData = {
        "fullname": fio,
        "sex": sex,
        "dob": dateB,
        "citizenship": citez,
        "serial": seria,
        "number": number,
        "dog": dateG,
        "wg": whoG,
        "registration": reg
      };
      console.log("Запрос паспорта:", requestData);
      axios.post(`/api/documents/passport?doc_token=${doc_token}`, requestData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        toast("Информация о паспорте успешно добавлена", { autoClose: 4000 });
        setFio(fio);
        setSex(sex);
        setCitez(citez);
        setSeria(seria);
        setNumber(number);
        setDateG(dateG);
        setWhoG(whoG);
        setReg(reg);
        setDateB(dateB);
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
        toast("Возникла ошибка с добавлением информации о паспорте", { autoClose: 4000 });
      });
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
                    type="number"
                    name="phone"
                    placeholder="Введите номер телефона"
                    value={phone} 
                    onChange={handlePhoneChange}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  />
                </Form.Group>
                      <div className="mb-2">
                        <Button variant="primary" 
                        onClick={handleSubmitPersInfo}
                        >
                        Сохранить
                        </Button>{' '}
                        <Button variant="secondary" onClick={handleCancel} >
                        Отменить
                        </Button>
                    </div>
                </Card>
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
                          onChange={handleFioChange}
                        />
                      </Form.Group>
                      {/* {(passwordDirty) && <div style ={{color:'red'}}>{passwordError}</div>} */}
                      <Row>
                      <Col>
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
                          onChange={handleSexChange}
                        />
                      </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control
                          type="date"
                          name = "password"
                          placeholder="Введите дату рождения"
                          value={pers.passport?.date_of_birth}
                        //   onBlur={e=>blurHandler(e)}
                          onChange={handleDateBChange}
                        />
                      </Form.Group>
                      </Col>
                      </Row>

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
                          onChange={handleCitezChange}
                        />
                      </Form.Group>

                      <Row>
                      <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Серия</Form.Label>
                        <Form.Control
                          type="number"
                          name = "password"
                          placeholder="Введите серию паспорта"
                          value={pers.passport?.serial}
                        //   onBlur={e=>blurHandler(e)}
                          onChange={handleSeriaChange}
                        />
                      </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Номер</Form.Label>
                        <Form.Control
                          type="number"
                          name = "password"
                          placeholder="Введите номер паспорта"
                          value={pers.passport?.number}
                        //   onBlur={e=>blurHandler(e)}
                          onChange={handleNumberChange}
                        />
                      </Form.Group>
                      </Col>
                      </Row>

                      <Form.Group
                        className="mb-3"
                        controlId="text"
                      >
                        <Form.Label>Дата выдачи:</Form.Label>  
                        <Form.Control
                          type="date"
                          name = "password"
                          placeholder="Введите дату выдачи паспорта"
                          value={pers.passport?.date_of_given}
                        //   onBlur={e=>blurHandler(e)}
                          onChange={handleDateGChange}
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
                          onChange={handleWhoGChange}
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
                          onChange={handleRegChange}
                        />
                      </Form.Group>


                      <div className="mb-2"> 
                        <Button variant="primary" 
                        onClick={handleSubmitPass}
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