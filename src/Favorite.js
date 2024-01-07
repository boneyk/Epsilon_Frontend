import React from "react";
import "./fave.css"
import { Container, Row, Col, Card,ListGroup } from "react-bootstrap";

export const Favorite = () => (
    <Container md ='4'style={{ paddingLeft:'5rem',paddingRight:'5rem',paddingTop: '2rem', paddingBottom: '2rem', justifyContent: "center", alignItems: "center" }}>
    <ListGroup>
      <ListGroup.Item className="fave_elem">Cras justo odio</ListGroup.Item>
      <ListGroup.Item className="fave_elem">Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item className="fave_elem">Morbi leo risus</ListGroup.Item>
      <ListGroup.Item className="fave_elem">Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item className="fave_elem">Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    </Container>
//   <Container md ='4'style={{ paddingLeft:'5rem',paddingRight:'5rem',paddingTop: '2rem', paddingBottom: '2rem', justifyContent: "center", alignItems: "center" }}>
//     <h3 style={{paddingBottom: '1rem', justifyContent: "center", alignItems: "center", fontSize: "20px"}}>Главная • Избранное</h3>
//     <Row className="fave_elem" >
//       <Col xs={6} md={4} >
//         <Card style={{height:190,width:190}}>
//           <Card.Img variant="left" src="/img/thailand.png" height='190' width='190'className="d-flex justify-content-left"/>
//         </Card>
//       </Col>
//       <Col xs={8} md={8} >
//         <h4>Надпись справа</h4>
//       </Col>
//     </Row>
//   </Container>
)
