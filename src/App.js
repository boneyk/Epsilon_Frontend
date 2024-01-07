import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from "react-bootstrap";
import Navibar from "./components/navibar";
import { Favorite } from "./Favorite";
import { Profile } from "./Profile";
import { Tours } from "./Tours";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navibar />
        <Routes>
          <Route path="/api/tours/favorite" element={<Favorite/>} />
          <Route path="/api/users/info" element={<Profile/>} />
          <Route path="api/tours" element={<Tours/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
