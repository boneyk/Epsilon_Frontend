import React from "react";
import "./fave.css"
import { Container, Row, Col, Card } from "react-bootstrap";

export const Favorite = () => (
  <Container md ='4'style={{ paddingLeft:'5rem',paddingRight:'5rem',paddingTop: '2rem', paddingBottom: '2rem', justifyContent: "center", alignItems: "center" }}>
    <h3 style={{paddingBottom: '1rem', justifyContent: "center", alignItems: "center", fontSize: "20px"}}>Главная • Избранное</h3>
    <Row className="fave_elem">
      <Col xs={6} md={4}>
        <Card style={{height:150,width:150}}>
          <Card.Img variant="left" src="/img/thailand.png" height='150' width='150'className="d-flex justify-content-begin"/>
        </Card>
      </Col>
      <Col xs={6} md={8} className="d-flex justify-content-end">
        <h4>Надпись справа</h4>
      </Col>
    </Row>
  </Container>
)
