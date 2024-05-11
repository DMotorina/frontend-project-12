import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from './utilities/routes';

import PrivatePage from './features/pages/PrivatePage';
import Header from './features/header/Header';
import ChatPage from './features/pages/ChatPage';
import LoginPage from './features/pages/LoginPage';
import NotFoundPage from './features/pages/NotFoundPage';
import SignupPage from './features/pages/SignupPage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chatPage()} element={<Header />}>
        <Route
          index
          element={(
            <PrivatePage>
              <ChatPage />
            </PrivatePage>
            )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signupPage()} element={<SignupPage />} />
        <Route path={routes.randomPagePath()} element={<NotFoundPage />} />
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
