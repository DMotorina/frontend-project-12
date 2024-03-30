import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import axios from 'axios';

import { setCredentials } from '../../../slices/usersSlice';

const LoginForm = () => {
  const { t } = useTranslation();

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
      } catch (err) {
        toast.error(t('toast.аuthorisationError'));
        setValidated(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('buttons.enter')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          isInvalid={validated}
          name="username"
          id="username"
          autoComplete="username"
          required
          type="text"
          placeholder={t('pages.login.nickname')}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputUsernameElem}
        />
        <Form.Label htmlFor="username">{t('pages.login.nickname')}</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          isInvalid={validated}
          name="password"
          id="password"
          autoComplete="current-password"
          required
          type="password"
          placeholder={t('pages.login.password')}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="password">{t('pages.login.password')}</Form.Label>
        <div className="invalid-tooltip">{t('errors.loginError')}</div>
      </Form.Floating>
      <Button
        disabled={formik.isSubmitting}
        variant="outline-primary"
        type="submit"
        className="w-100 mb-3"
      >
        {t('buttons.enter')}
      </Button>
    </Form>
  );
};

export default LoginForm;
