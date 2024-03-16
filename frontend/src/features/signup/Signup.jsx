import React from 'react';
import {
  Row,
  Container,
  Col,
  Card,
  Image,
} from 'react-bootstrap';

import image from '../../assets/img/signup-img.jpg';
import { SignUpForm } from './SignUpForm';

export const Signup = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <Image src={image} roundedCircle alt="Зарегистрироваться" />
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);