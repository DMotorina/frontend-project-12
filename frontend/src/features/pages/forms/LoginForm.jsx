import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useRef, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { setCredentials } from '../../../slices/usersSlice';

import useApi from '../../../hooks/useApi';

import routes from '../../../utilities/routes';

const LoginForm = () => {
  const { t } = useTranslation();

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useApi();

  const location = useLocation();
  const path = location.state === null ? routes.chatPage() : location.state.from;

  const inputUsername = useRef(null);
  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsInvalid(false);

      try {
        const res = await api.loginUser(values);
        dispatch(setCredentials(res));
        navigate(path);
      } catch (err) {
        setIsInvalid(true);

        if (err.response.status === 401) {
          setErrorMessage(t('errors.loginError'));
        } else {
          setErrorMessage(t('errors.networkError'));
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('buttons.enter')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          isInvalid={isInvalid}
          name="username"
          id="username"
          autoComplete="username"
          required
          type="text"
          placeholder={t('pages.login.nickname')}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={inputUsername}
        />
        <Form.Label htmlFor="username">{t('pages.login.nickname')}</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          isInvalid={isInvalid}
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
        <div className="invalid-tooltip">{errorMessage}</div>
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
