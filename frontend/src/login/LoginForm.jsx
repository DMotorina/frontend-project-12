import {React, useState } from "react";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import { Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/userSlice';
import { useDispatch } from 'react-redux';


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
        const res = await axios.post('api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        dispatch(setCredentials(res.data));
        setValidated(false);
        navigate('/');
      } catch(err) {
        setValidated(true);
        formik.setSubmitting(false);
      }
  }})

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset disabled={formik.isSubmitting}>
              <Form.Group>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Ваш ник"
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Пароль"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                />
              </Form.Group>
              <Button type="submit" variant="outline-primary">Войти</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};
