import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from "react-bootstrap";
import Navibar from "./components/navibar";
import { Favorite } from "./Favorite";
import { Profile } from "./Profile";
import { Tours } from "./Tours";
import { TourLending } from "./TourLending";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./Login"
import { Notfound } from "./NotFound"
import { Reg } from "./Reg"
import { Busket } from "./Busket"
import { Docs } from "./Docs"
import { Confirm } from "./Confirm"
import Fotter from "./components/Fotter"
import { PersDock } from "./PersDock";
import { SeeConf } from "./SeeConf";


function App() {
  const tour_id = localStorage.getItem("tour_id");
  return (
    <>
      <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Notfound />} />
      <Route path="api/reg" element={<Reg />} />
      <Route path= "/api/tours/1" element={<TourLending />} />
      <Route path= "/api/tours/2" element={<TourLending />} />
      <Route path= "/api/tours/3" element={<TourLending />} />
      <Route path= "/api/tours/4" element={<TourLending />} />
      <Route path= "/api/tours/5" element={<TourLending />} />
      <Route path= "/api/tours/6" element={<TourLending />} />
      <Route path="api/tours/favorite" element={<Favorite/>} />
      <Route path="api/tours/history" element={<Busket/>} />
      <Route path="api/documents" element={<Docs/>} />
      <Route path="api/documents/person" element={<PersDock/>} />
      <Route path="api/users/info" element={<Profile/>} />
      <Route path="/api/trip" element={<Confirm/>} />
      <Route path="/api/trip/conf" element={<SeeConf/>} />
      <Route path="api/tours" element={<Tours />} />
      </Routes>
      </Router>
      <Fotter/>
   </>
  );
}


export default App;
