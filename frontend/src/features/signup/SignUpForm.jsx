import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import axios from 'axios';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';

import { setCredentials } from '../../slices/usersSlice';

export const SignUpForm = () => {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputUsernameElem = useRef(null);
  useEffect(() => {
    inputUsernameElem.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required('Это обязательное поле')
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup.string()
      .required('Это обязательное поле')
      .min(6, 'Минимум 6 символов'),
    confirmPassword: yup.string()
      .required('Это обязательное поле')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setValidated(false);

      try {
        const res = await axios.post('api/v1/signup', values);
        dispatch(setCredentials(res.data));
        localStorage.setItem('userId', JSON.stringify(res.data));
        navigate('/');
      } catch (e) {
        setValidated(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          name="username"
          id="username"
          type="text"
          placeholder="Ваш ник"
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputUsernameElem}
          isInvalid={(formik.errors.username && formik.touched.username) || validated}
        />
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          name="password"
          id="password"
          autoComplete="current-password"
          required
          type="password"
          placeholder="Пароль"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={(formik.errors.password && formik.touched.password) || validated}
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder="Подтвердите пароль"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword) || validated}
        />
        <Form.Label htmlFor="username">Подтвердите пароль</Form.Label>
        {formik.errors.confirmPassword && formik.touched.confirmPassword
          ? (<Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>)
          : (<Form.Control.Feedback type="invalid" tooltip>Пользователь уже существует!</Form.Control.Feedback>)}
      </Form.Floating>

      <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">Зарегистрироваться</Button>
    </Form>
  );
};