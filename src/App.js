import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from "react-bootstrap";
import Navibar from "./components/navibar";
import { Favorite } from "./Favorite";
import { Profile } from "./Profile";
import { Tours } from "./Tours";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./Login"
import { Reg } from "./Reg"


function App() {
  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="api/reg" element={<Reg />} />
      </Routes>
        <Navibar />
        <Routes>
          <Route path="api/tours/favorite" element={<Favorite/>} />
          <Route path="api/tours" element={<Tours/>} />
          <Route path="api/users/info" element={<Profile/>} />
          <Route path="api" element={<Tours/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
