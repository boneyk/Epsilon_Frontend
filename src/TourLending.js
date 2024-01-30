import Image from 'react-bootstrap/Image';
import React, { useState, useEffect,useRef } from "react";
import { Container, Row, Form, Col, Card, Button, Spinner} from "react-bootstrap";
import Navibar from "./components/navibar";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref, listAll,
    list } from 'firebase/storage';
    import { storage } from "./firebase";

function formatPrice(number) {
    // Проверка, является ли number числом
    if (typeof number !== 'number') {
      return '';
    }
  
    // Преобразование числа в строку и добавление разделителей для тысяч
    let priceString = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
  
    // Добавление знака валюты
    return priceString;
  }
  

export const TourLending = () => {
    const [tourinfo, setTour] = useState([]);
    const tour_id = localStorage.getItem("tour_id");
    const token = localStorage.getItem("token");
    console.log("tour_id из хранилища:", tour_id);
    console.log("токен из хранилища:", token);
    const [imageUrls, setImageUrls] = useState([]);
    

    useEffect(() => {
      axios.get(`/api/tours/${tour_id}?token=${token}`)
      .then((response) => {
        // Обработка успешного ответа
        console.log("Ответ сервера:", response.data);
        setTour(response.data);
        loadImages(response.data); // Вызов функции для загрузки изображений
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка запроса:", error);
      });

    }, []); 
    const loadImages = async (toursData) => {
        const urls = [];
        for (const image of toursData.tour.images) {
          const imageName = image.filename;
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
            toast("Тур успешно добавлен в избранное", { autoClose: 4000 });
          })
          .catch((error) => {
            // Обработка ошибки
            console.error("Ошибка запроса:", error);
          });
      };

      const [price, setPrice] = useState(null);

      const handleBuy = (event) => {
        event.preventDefault();
        setPrice(tourinfo.tour?.price_per_one * selectedPersons.length);
        console.log("Ответ pers:", selectedPersons); 
        console.log("Ответ date:", selectedDate);
        const requestData = {
            "date_id": selectedDate,
            "tour_id": tour_id,
            "token": token,
            "person_list": selectedPersons,
            "price": tourinfo.tour?.price_per_one * selectedPersons.length
          };
          // Преобразование в строку и сохранение в localStorage
        if(selectedDate !== null && selectedPersons.length > 0){
            localStorage.setItem("conf_info", JSON.stringify(requestData));
            console.log("Запрос:", localStorage.getItem("conf_info"));
            window.location.href = `/api/trip`;
        }else{
            toast("Выберите туристов и дату", { autoClose: 4000 });
        }
      };
        
      const [selectedDate, setSelectedDate] = useState(null);
      const [prevDate, setPrevDate] = useState(null);

      const handleDateChange = (e, token) => {
        const selDate = e.target.id;
        if (selDate !== prevDate) {
          // Записываем выбранное значение в переменную или состояние
          setSelectedDate(selDate);
          setPrevDate(selDate);
          console.log("Ответ date:", e.target.id);
        } else {
          // Если выбранное значение совпадает с предыдущим, устанавливаем selectedDate в null
          setSelectedDate(null);
          setPrevDate(null);
        }
      };
      const handleDateClick = (index) => {
        const updatedDates = tourinfo.tour.date.map((type, i) => ({
          ...type,
          checked: i === index, 
        }));
      
        setTour({
          ...tourinfo,
          tour: {
            ...tourinfo.tour,
            date: updatedDates,
          },
        });
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
        <Navibar />
        {imageUrls.length === 0 ? (
          <Row style={{justifyContent: "center", alignItems: "center",marginTop:"13rem",marginBottom:"13rem"}}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></Row>
        ) : (
            <Container className="d-flex justify-content-center align-items-center">
            <ToastContainer />
                <Row>
                    <Image src={imageUrls[1]} fluid />
                    <Button
                        onClick={handleAdd}
                        style={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
                            marginTop:'1rem',
                            backgroundColor: 'transparent', // Делаем кнопку прозрачной
                            border: 'none', // Убираем границу у кнопки
                        }}>
                        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить в избранное</h1> 
                        <img
                            src="/img/edit_ico.png"
                            width="30"
                            height="30"
                            alt="Иконка редактирования"
                        />
                    </Button>
                    
                        <div className="d-flex justify-content-center align-items-center" style={{ marginTop:'1rem', marginBottom:'1rem' }}>
                            <h1 style={{ fontSize: "38px", margin: "0" }}>• Описание тура •</h1>
                        </div>
                    <Row style={{ justifyContent: "center", alignItems: "center",marginBottom:"2rem" }}>
                        <Col xs="auto" className="" md={4} lg={4}>
                            <Card
                                className="shadow px-4"
                                style={{ backgroundColor: "#B8CBE9", borderColor: "#B8CBE9", marginBottom: "20px" }}
                            >
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>{tourinfo.tour?.name}</h1>
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>{tourinfo.tour?.country}, {tourinfo.tour?.city}</h1>
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>Тип тура:<br/>{tourinfo.tour?.tour_type}</h1>
                                <h1 className="text-center" style={{ fontSize: "24px", marginTop: "1rem",marginBottom:"1rem" }}>Описание тура:<br/>{tourinfo.tour?.description}</h1>
                                <div className="mb-2">

                                </div>
                            </Card>
                        </Col> 
                        <Col xs="auto" className="" md={4} lg={4}>
                        <Col>
                            <img src={imageUrls[2]} style={{ width: "105%", height: "auto", marginRight: "20px", marginBottom: "1rem" }} />
                        </Col>
                        <Col>
                            <div style={{ display: "flex" }}>
                                <img src={imageUrls[3]} style={{ width: "50%", height: "auto", marginRight: "20px", marginBottom: "1rem" }} />
                                <img src={imageUrls[4]} style={{ width: "50%", height: "auto", marginBottom: "1rem" }} />
                            </div>
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
                            {(tourinfo.persons?.length === 0) && <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                                Для покупки тура Вам необходимо добавить туристов в личном профиле в разделе "Туристы и Документы"
                            </h1>}
                            {tourinfo?.persons && tourinfo.persons?.some(person => person.fullname === null) ? (
                            <h1 style={{ fontSize: "20px", marginLeft: "10px" }}>
                                Для покупки тура Вам необходимо отредактировать имена туристов в личном профиле в разделе "Туристы и Документы"
                            </h1>
                        ) : (
                            tourinfo.persons?.map((type) => (
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
                            ))
                        )}
                        </h1>
                        </div>
                    </div>
                    </Row>



                    <Row>
                    <div className="mb-2">
                        <div className="d-flex flex-column align-items-center">
                        <h1 className="text-center" style={{ fontSize: "38px", marginTop: "1rem", marginBottom: "2rem" }}>• Даты •
                            {tourinfo.tour?.date?.map((type, index) => (
                            <Form key={type.dateStart} className="mb-3" style={{ fontSize: "30px", marginTop: "1rem"}}>
                                <Form.Check
                                type="radio"
                                id={type.id}
                                name="group1"
                                label={`c ${type.dateStart} по ${type.dateEnd}`}
                                checked={type.checked}
                                onChange={(e) => handleDateChange(e, type.token)}
                                onClick={() => handleDateClick(index)} // Добавляем обработчик клика на строчку
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




                    <Row className="d-flex justify-content-between align-items-center" style={{ borderTop:'1px solid black', borderBottom: '1px solid black',marginBottom:"2rem"}} xs="auto">
                    <Container style={{marginBottom:"2rem",marginTop: "2rem" }}>
                            <h1 className="text-center" style={{ fontSize: "40px"}}>Цена за тур:<br/>{formatPrice(tourinfo.tour?.price_per_one)} ₽</h1>
                    </Container>
                    <Container style={{marginBottom:"2rem",marginTop: "2rem" }}>
                        <Container>
                            <Button variant="secondary" className="text-center" style={{fontSize: "35px",background:"#8BB2BB",width:"250px", height: "100px", borderColor:"#8BB2BB", color: "black"}}
                             onClick={handleBuy}
                             >
                                Заказать тур
                            </Button>
                            <ToastContainer />
                        </Container>
                    </Container> 
                    </Row>





                </Row>
            </Container>
        )}
        </div>
    );
};
