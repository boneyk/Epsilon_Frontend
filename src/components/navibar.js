import React from "react";
import "./navibar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navibar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" defaultActiveKey="catalog" style={{ borderBottom: '1px solid black' }}>
        <Container>
          <Navbar.Brand>
            <Link to="/api/tours">
              <img src="/img/touragency.png" className="navimg" alt="tourAgency icon"/>
            </Link>
          </Navbar.Brand>
          <h1 style={{ display: "flex",fontSize: "15px", textAlign: "center",marginLeft: "1rem" }}>Служба поддержки: <br/> 8 (900) 000 - 00 - 00</h1>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <Nav.Link eventKey="favorite">
                <Link to="/api/tours/favorite" style={{ textDecoration: 'none' }}>
                  <div style={{ textAlign: "center" }} className="navtext">
                    <img
                      src="/img/favorite.png"
                      width="40"
                      height="40"
                      className="d-inline-block align-top"
                      alt="Favorite icon"
                    />
                    <div>Избранное</div>
                  </div>
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="profile">
                <Link to="/api/users/info" style={{ textDecoration: 'none' }}>
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
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="catalog">
                <Link to="/api/tours" style={{ textDecoration: 'none' }}>
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
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
