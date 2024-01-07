import React from "react";
import "./navibar.css"
import { Navbar, Nav, Container } from "react-bootstrap";
import {Link} from "react-router-dom";

export default function navibar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
        <Navbar.Brand>
              <img src="/img/touragency.png" className="navimg" alt="tourAgency icon"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navelements">
          <h1 style={{ fontSize: "15px", textAlign: "center" }}>Служба поддержки: <br/> 8 (900) 000 - 00 - 00</h1>
          <Nav.Link><Link to ="api/tours/favorite">
            <div style={{ textAlign: "center" }} className="navtext">
              <img
              src="/img/favorite.png"
              width="50"
              height="40"
              className="d-inline-block align-top"
              alt="Favorite icon"
              />
            <div>Избранное</div>
          </div>
          </Link></Nav.Link>
          <Nav.Link><Link to ="api/users/info">
            <div style={{ textAlign: "center" }}  className="navtext">
              <img
              src="/img/profile.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Profile icon"
              />
            <div>Профиль</div>
          </div>
          </Link></Nav.Link>
          <Nav.Link><Link to ="api/tours">
            <div style={{ textAlign: "center" }}  className="navtext">
              <img
              src="/img/catalog.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Catalog icon"
              />
            <div>Каталог</div>
          </div>
          </Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
