import React from "react";
import { Container, Row } from "react-bootstrap";
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
    </Row>
    </Container>
);
export default Header;