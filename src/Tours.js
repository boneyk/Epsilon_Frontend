import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navibar from "./components/navibar";


export const Tours = () => (
  <>
  <Navibar />
  <Container style={{ paddingTop: '2rem', paddingBottom: '2rem', justifyContent: "center", alignItems: "center"}}>
    <Container>

    </Container>
    <h2 style={{paddingLeft: '6rem', paddingBottom: '1rem', justifyContent: "center", alignItems: "center"}}>Наши туры:</h2>
    <Row style={{justifyContent: "center", alignItems: "center"}}>
      <Col xs="auto" style={{paddingBottom: '1rem'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img src="/img/thailand.png" />
          <Card.ImgOverlay>
            <Card.Title>Таиланд</Card.Title>
            <Card.Body>150 154 ₽</Card.Body>
            
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xs="auto" style={{paddingBottom: '1rem'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img src="/img/thailand.png" />
          <Card.ImgOverlay>
            <Card.Title>Таиланд</Card.Title>
            <Card.Body>150 154 ₽</Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xs="auto" style={{paddingBottom: '1rem'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img src="/img/thailand.png" />
          <Card.ImgOverlay>
            <Card.Title>Таиланд</Card.Title>
            <Card.Body>150 154 ₽</Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </Row>
    <Row style={{ paddingTop: '2rem', paddingBottom: '2rem',justifyContent: "center", alignItems: "center"}}>
      <Col xs="auto" style={{paddingBottom: '1rem'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img src="/img/thailand.png" />
          <Card.ImgOverlay>
            <Card.Title>Таиланд</Card.Title>
            <Card.Body>150 154 ₽</Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xs="auto" style={{paddingBottom: '1rem'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img src="/img/thailand.png" />
          <Card.ImgOverlay>
            <Card.Title>Таиланд</Card.Title>
            <Card.Body>150 154 ₽</Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
      <Col xs="auto" style={{paddingBottom: '1rem'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img src="/img/thailand.png" />
          <Card.ImgOverlay>
            <Card.Title>Таиланд</Card.Title>
            <Card.Body>150 154 ₽</Card.Body>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </Row>
  </Container>
  </>
);
