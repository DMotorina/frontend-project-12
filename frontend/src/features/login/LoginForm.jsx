import React, {useState, useRef, useEffect } from "react";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import {
  Row,
  Container,
  Button,
  Navbar,
  Col,
  Card,
  Image,
  Form,
} from 'react-bootstrap';
import logo from '../../assets/login-image.jpeg'


const SignupSchema = Yup.object().shape({
  username: Yup
    .string()
    .min(2, 'Минимум 2 буквы')
    .max(10, 'Максимум 10 букв')
    .required('Обязательное поле'),
  
  password: Yup
    .string()
    .min(2, 'Минимум 2 буквы')
    .max(10, 'Максимум 10 букв')
    .required('Обязательное поле')
});


export const LoginForm = () => {
  const inputUsernameElem = useRef(null);

  useEffect(() => {
    inputUsernameElem.current.focus();
  }, []);

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/login', values);
        dispatch(setCredentials(res.data));
        localStorage.setItem('userId', JSON.stringify(res.data));
        setValidated(false);
        navigate('/');
      } catch(err) {
        setValidated(true);
      }
  }})

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Image src={logo} roundedCircle alt="Войти" />
                </Col>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      isInvalid={validated}
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      type="text"
                      placeholder="Ваш ник"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      ref={inputUsernameElem}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      isInvalid={validated}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      type="password"
                      placeholder="Пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                  </Form.Floating>
                  <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                  <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">Войти</Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <Link to="/signup">Регистрация</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
