import 'react-toastify/dist/ReactToastify.css';

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PrivateOutlet } from './shared/outlets/private';

import { Header } from './features/header/Header';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login';
import NotFound from './features/404/NotFound';
import { Signup } from './features/signup/Signup';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            index
            element={(
              <PrivateOutlet>
                <Home />
              </PrivateOutlet>
            )}
          />   
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
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
  )
}
  