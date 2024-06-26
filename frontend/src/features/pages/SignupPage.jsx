import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  Row, Container, Col, Card, Image,
} from 'react-bootstrap';

import SignUpForm from './forms/SignUpForm';

import signupImg from '../../assets/images/signup.jpg';

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={signupImg} roundedCircle alt={t('pages.signup.register')} />
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
