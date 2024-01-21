import React from "react";
import "./navibar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar_man() {
  return (
    <>
      <Navbar  className="bg-body-tertiary" collapseOnSelect expand="lg" bg="light" variant="light" defaultActiveKey="catalog" style={{ borderBottom: '1px solid black' }}>
        <Container>
          <Navbar.Brand>
            <Link to="/api/tours">
              <img src="/img/touragency.png" className="navimg" alt="tourAgency icon"/>
            </Link>
          </Navbar.Brand>
          <h1 style={{ fontSize: "30px", textAlign: "center",marginLeft:'1rem' }}>Система работы менеджера</h1>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="me-auto" >
            </Nav>
            <Nav style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <Nav.Link eventKey="favorite">
                <Link to="/api/manager/tours" style={{ textDecoration: 'none' }}>
                    <div className="navtext">
                    <div>Обработка заявок</div>
                    </div>
                </Link>
                </Nav.Link>
                <Nav.Link eventKey="profile">
                <Link to="/api/manager/edit" style={{ textDecoration: 'none' }}>
                    <div className="navtext">
                    <div>Редактирование туров</div>
                    </div>
                </Link>
                </Nav.Link>
            <Nav.Link eventKey="favorite">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div style={{ textAlign: "center" }} className="navtext">
                    <img
                      src="/img/home.png"
                      width="40"
                      height="40"
                      className="d-inline-block align-top"
                      alt="Home icon"
                    />
                    <div>Выйти</div>
                  </div>
                </Link>
              </Nav.Link>
            </Nav>
        </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}
