import React from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Row, Container, Col, Card, Image,
} from 'react-bootstrap';

import routes from '../../utilities/routes';

import LoginForm from './forms/LoginForm';

import logoImg from '../../assets/images/login.jpeg';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={logoImg} roundedCircle alt="Войти" />
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('pages.login.noExistingAccount')}</span>
                <Link to={routes.signupPage()}>{t('pages.login.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
