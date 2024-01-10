import React from "react";
import { Container, Row,Navbar, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";

const Header = () => (
    <Container style={{ borderBottom: '1px solid black' }}>
        <Row xs="auto" className="justify-content-center mt-4" style={{ paddingBottom: '1rem'}}>
        <Container md = {1}>
            <Link to ="api/tours">
              <img src="/img/touragency.png" width={'90'} height={'70'} alt="tourAgency icon"/>
            </Link>
        </Container>
        <Container md = {1} className="d-flex align-items-center justify-content-left">
            <h1 style={{ fontSize: "30px", textAlign: "center" }} className="text-center ">Путешествуй по России</h1>
        </Container>
        <Container md = {1} className="d-flex align-items-center justify-content-right">
            <h1 style={{ fontSize: "15px", textAlign: "center" }}>Служба поддержки: <br/> 8 (900) 000 - 00 - 00</h1>
        </Container>
        <Nav>
        <Nav.Link eventKey="catalog">
        <Link to="/api/tours" style={{
                              textDecoration: "none",
                              color: "black",
                            }}>
            <div style={{ textAlign: "center" }} >
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
    </Row>
    </Container>
);
export default Header;