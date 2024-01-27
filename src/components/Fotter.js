import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => (
  <>
  <Container style={{ borderTop: '1px solid black' }} >
    <Row xs="auto" className="justify-content-center mt-4" style={{ paddingBottom: '1rem' }}>
      <h1 style={{ fontSize: '18px', background: "#E9DDDD",padding:'5px' }} className="text-center">
        Новое турагентство с широким выбором туров по всему миру. Мы создаем незабываемый опыт<br /> для наших клиентов, предлагая различные виды туров - от экскурсий до пляжного отдыха.<br /> Найдите идеальный вариант для вашего отпуска с нами!
      </h1>
    </Row>
    <Row xs="auto">
    <Container >
      <a className="social_link mr-2" href="https://t.me/plusninap" target="_blank">
        <img src="/img/nastya.png" alt="" width="47" height="47" />
      </a>
      <a className="social_link mr-2" href="https://t.me/Festfull" target="_blank">
        <img src="/img/dima.png" alt="" width="47" height="47" />
      </a>
      <a className="social_link mr-2" href="https://t.me/Asceladdd" target="_blank">
        <img src="/img/maksim.png" alt="" width="47" height="47" />
      </a>
      <a className="social_link" href="https://t.me/Kristpik" target="_blank">
        <img src="/img/dasha.png" alt="" width="47" height="47" />
      </a>
        <h1 style={{ fontSize: '15px' }}>Мы в соцсетях</h1>
    </Container>
      <Container>
        <Container >
            <h1 style={{ fontSize: '18px', background: "#E9DDDD",padding:'5px' }} className="text-center">
              helpYou@gmail.com
            </h1>
            <h1 style={{ fontSize: '15px'}} >Служба поддержки</h1>
            </Container>
      </Container>
    </Row>
  </Container>
  </>
);

export default Footer;
