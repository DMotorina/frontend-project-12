import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Container, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import LoginForm from './components/LoginForm';

import logo from '../../assets/images/login.jpeg';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={logo} roundedCircle alt="Войти" />
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

export default Login;
