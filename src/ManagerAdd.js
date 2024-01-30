import React, { useState, useEffect } from "react";
import { Container, Row, Form,Col,Card,Button,Toast,Spinner } from "react-bootstrap";
import axios from "axios";
import Navibar from "./components/navibar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar_man from "./components/navbar_man";
import { getDownloadURL, ref, listAll,uploadBytes,
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


export const ManagerAdd = () => {
const [tour, setInfo] = useState([]);
const tour_id = localStorage.getItem("tour_id");
const token = localStorage.getItem("token");
const [dates, setDates] = useState([]);

const [name, setName] = useState("");
const [country, setCountry] = useState("");
const [city, setCity] = useState("");
const [tour_type, setType] = useState("");
const [capacity, setCapacity] = useState(0);
const [price, setPrice] = useState(0);
const [description, setDescription] = useState("");

const [imageUrls, setImageUrls] = useState([]);



useEffect(() => {
  axios
    .get(`http://89.223.122.223:8080/api/tours/${tour_id}?token=${token}`,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => {
      console.log("Ответ сервера:", response.data);
      setInfo(response.data);
      setDates(response.data.tour.date);
      setName(response.data.tour.name);
      setCountry(response.data.tour.country);
      setCity(response.data.tour.city);
      setCapacity(response.data.tour.capacity);
      setPrice(response.data.tour.price_per_one);
      setDescription(response.data.tour.description);
      setType(response.data.tour.tour_type);
      loadImages(response.data); // Вызов функции для загрузки изображений
    })
    .catch((error) => {
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

const [photos, setPhotos] = useState([]);


const handleNameChange = (event) => {
  setName(event.target.value);

};
const handleCountryChange = (event) => {
  setCountry(event.target.value);

};
const handleCityChange = (event) => {
  setCity(event.target.value);

};
const handleTypeChange = (event) => {
  setType(event.target.value);

};
const handleCapacityChange = (event) => {
  setCapacity(event.target.value);

};
const handlePriceChange = (event) => {
  setPrice(event.target.value);

};
const handleDescChange = (event) => {
  setDescription(event.target.value);

};

const handleSubmit = (event) => {
  const requestData = {
    "name": name,
    "country": country,
    "city": city,
    "tour_type": tour_type,
    "capacity": capacity,
    "price_per_one": price,
    "description": description,
    "dates": dates
    };
    console.log("Запрос:", requestData);
  axios
    .patch(`http://89.223.122.223:8080/api/manager/edit/${tour_id}?token=${token}`,requestData,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => {
      console.log("Ответ сервера:", response.data);
      setInfo(response.data);
      toast("Информация успешно обновлена", { autoClose: 4000 });
    })
    .catch((error) => {
      toast("Вы не курируете данный тур", { autoClose: 4000 });
      console.error("Ошибка запроса:", error);
    });
    const date_id =localStorage.getItem("date_id");
    const newDate = {
      dateStart: "",
      dateEnd: ""
    };
    console.log("Запрос:", newDate);
    axios
    .patch(`http://89.223.122.223:8080/api/manager/edit/${tour_id}/date/${date_id}?token=${token}`,requestData,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => {
      console.log("Ответ сервера:", response.data);
      setInfo(response.data);
      toast("Информация успешно обновлена", { autoClose: 4000 });
      localStorage.setItem("date_id",null);
    })
    .catch((error) => {
      console.error("Ошибка запроса:", error);
    });
};

const handleAddPhoto = (event) => {
  setImageUpload(event.target.files[0]);
};


const handleAddClick = () => {
  console.log("Массив дат:", dates);
  const newDate = {
    dateStart: "",
    dateEnd: "",
  };
  setDates((prevDates) => [...prevDates, newDate]);
};

const handleSaveClick = () => {
  
};

const handleDel = (photo) => {
  axios
    .delete(`http://89.223.122.223:8080/api/manager/edit/${tour_id}/image/${photo.id}?token=${token}`,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => {
      console.log("Ответ сервера:", response.data);
      setInfo(response.data);
      toast("Информация успешно обновлена", { autoClose: 4000 });
      localStorage.setItem("date_id",null);
    })
    .catch((error) => {
      toast("Вы не курируете данный тур", { autoClose: 4000 });
      console.error("Ошибка запроса:", error);
    });
};

const [imageUpload, setImageUpload] = useState(null);
const imagesListRef = ref(storage, "img/");
  const uploadFile = () => {

    const requestData = {
      "filename": `${imageUpload.name.split(".")[0]}`,
      "path": "/images/",
      "alt": "описание",
      "size": "1920x1080",
      "content_type": ".png"
  }
  console.log("иМЯ картинки:", requestData);

    axios
    .post(`http://89.223.122.223:8080/api/manager/edit/${tour_id}/image?token=${token}`,requestData,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => {
      console.log("Ответ сервера:", response.data);
      toast("Информация успешно обновлена", { autoClose: 4000 });
      if (imageUpload == null) return;
    const imageRef = ref(storage, `img/${imageUpload.name}`);
    console.log("Картинка отправляется:", imageUpload.name);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    })
    .catch((error) => {
      toast("Вы не курируете данный тур", { autoClose: 4000 });
      console.error("Ошибка запроса:", error);
    });
    
  };

  return (
    <>
      <Navbar_man />
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center" }}>
        <Container></Container>
        <ToastContainer />
        <h2 style={{ paddingLeft: '3rem', paddingBottom: '1rem',justifyContent: "center", alignItems: "center"  }}>Менеджер • Редактирование тура</h2>
      <Row style={{justifyContent: "center", alignItems: "center"}}>
        <Col xs="auto" className="p-0" md={8} lg={8}>
        <Card
            className="shadow px-4"
            style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
        >
            <h2 style={{ borderBottom: "1px solid black" }}>Информация о туре</h2>
            <Card.Body>
            <div>
        <Form.Group>
          <Form.Label>Название тура:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Страна:</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={handleCountryChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Город:</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={handleCityChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Тип тура:</Form.Label>
          <Form.Control
            type="text"
            value={tour_type}
            onChange={handleTypeChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Стоимость на 1 человека(руб.):</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={handlePriceChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Вместительность(чел.):</Form.Label>
              <Form.Control
                type="text"
                value={capacity}
                onChange={handleCapacityChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Описание тура:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleDescChange}
          />
        </Form.Group>
        {dates.map((date, index) => (
        <Row key={index}>
          <Col>
            <Form.Group>
              <Form.Label>Дата начала:</Form.Label>
              <Form.Control
                type="date"
                defaultValue={date.dateStart}
                onChange={(e) => {
                  const newDate = { ...date, dateStart: e.target.value };
                  const newDates = [...dates];
                  newDates[index] = newDate;
                  setDates(newDates);
                  localStorage.setItem("date_id",date.id);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Дата конца:</Form.Label>
              <Form.Control
                type="date"
                defaultValue={date.dateEnd}
                onChange={(e) => {
                  const newDate = { ...date, dateEnd: e.target.value };
                  const newDates = [...dates];
                  newDates[index] = newDate;
                  setDates(newDates);
                  localStorage.setItem("date_id",date.id);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      ))}
      <Row style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-between", // Добавляем свойство для выравнивания по правому краю
            marginTop:'1rem'
        }}><Col>
          <Link
        onClick={() => handleSaveClick()}
        style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
            marginTop:'1rem'
        }}
        >
        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Сохранить дату</h1>
        <img
            src="/img/edit_ico.png"
            width="30"
            height="30"
            alt="Иконка редактирования"
        />
        </Link>
        </Col>
        <Col>
          <Link
        onClick={() => handleAddClick()}
        style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Добавляем свойство для выравнивания по правому краю
            marginTop:'1rem'
        }}
        >
        <h1 style={{ fontSize: "20px", marginRight: "10px" }}>Добавить дату</h1>
        <img
            src="/img/edit_ico.png"
            width="30"
            height="30"
            alt="Иконка редактирования"
        />
        </Link>
        </Col>
          </Row>
          <Row style={{marginTop:"1rem"}}>
        <div className="mb-2"> 
                        <Button variant="primary" 
                        onClick={handleSubmit}
                        >
                        Сохранить
                        </Button>{' '}
                        <Button variant="secondary">
                        Отменить
                        </Button>
                    </div>
        </Row>
      </div>
            </Card.Body>
        </Card>
        </Col>
        </Row>

        <Row style={{justifyContent: "center", alignItems: "center"}}>
        <Col xs="auto" md={8} lg={8}>
      <Card
              className="shadow px-4"
              style={{ backgroundColor: "#DDDFEB", borderColor: "#DDDFEB", marginBottom: "20px" }}
            >
        <h2 style={{borderBottom:'1px solid black'}}>Фотографии тура:</h2>
        <Card.Body>
        <Row>
        <Col md={6}>
            <Card.Title>Добавленные фотографии</Card.Title>
            {imageUrls.length === 0 ? (
          <Row style={{justifyContent: "center", alignItems: "center",marginTop:"13rem",marginBottom:"13rem"}}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></Row>
        ) : (
            <ListGroup>
              {tour?.tour?.images?.map((photo, index) => (
                <Card.Text className="text-center" style={{background:"#F3F6FB",borderRadius: "10px",textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px"}} inline>
                    <h1 style={{ fontSize: "17px",padding:'1rem'}}>{photo.filename}</h1>
              <div style={{justifyContent: "space-end"}}>
                <img
              src={imageUrls[index]}
              width="40"
              height="40"
              alt="Photo icon"
              style={{marginRight:'1rem'}}
            />
                <Link onClick={() => handleDel(photo)}>
                <img
                  src="/img/del_ico.png"
                  width="40"
                  height="30"
                  alt="TO icon"
                  style={{marginRight:'1rem'}}
                />
                </Link>
                </div>
            </Card.Text>
            ))}
            </ListGroup>
        )}
          </Col>
          <Col md={6}>
            <Card.Title>Добавить фотографию</Card.Title>
            <Form.Control type="file" 
            onChange={(e) => handleAddPhoto(e)}
             />
            <Button variant="primary" style={{marginTop:"1rem"}}
                        onClick={uploadFile}
                        >
                        Добавить
                        </Button>
          </Col>
        </Row>
        </Card.Body>
        </Card>
        </Col>
        </Row>

      </Container>
    </>
  );
};
