import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Navigate, Routes, Route, useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './features/header/Header';
import Home from './features/home/Home';
import Login from './features/login/Login';
import NotFound from './features/404/NotFound';
import Signup from './features/signup/Signup';
import routes from './routes';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    token ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chatPage()} element={<Header />}>
        <Route
          index
          element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            )}
        />
        <Route path={routes.loginPage()} element={<Login />} />
        <Route path={routes.signupPage()} element={<Signup />} />
        <Route path={routes.randomPagePath()} element={<NotFound />} />
      </Route>
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);

export default AppRoutes;
