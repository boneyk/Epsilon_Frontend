import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from "react-bootstrap";
import Navibar from "./components/navibar";
import { Favorite } from "./Favorite";
import { Profile } from "./Profile";
import { Tours } from "./Tours";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./Login"
import { Notfound } from "./NotFound"
import { Reg } from "./Reg"
import Fotter from "./components/Fotter"
import axios from "axios";

const requestData = {
  // данные для аутентификации
  "login":"123",
  "password":"123"
};

function App() {
  // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
//   axios.post("/api/auth", requestData, {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// })
// .then(response => {
//   // Обработка успешного ответа
//   console.log("Ответ сервера:", response.data);
// })
// .catch(error => {
//   // Обработка ошибки
//   console.error("Ошибка запроса:", error);
// });
  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Notfound />} />
      <Route path="api/reg" element={<Reg />} />
      <Route path="api/tours/favorite" element={<Favorite/>} />
      <Route path="api/users/info" element={<Profile/>} />
      <Route path="api/tours" element={<Tours />} />
      </Routes>
      </Router>
      <Fotter/>
   </>
  );
}


export default App;
