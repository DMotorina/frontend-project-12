import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PrivateOutlet } from './shared/outlets/private';

import { Header } from './features/header/Header';
import { Home } from './features/home/Home';
import { Login } from './features/login/Login';
import { NotFound } from './features/404/NotFound';

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
          <Route path="*" element={<NotFound />} />
        </Route>       
      </Routes>
    </BrowserRouter>
  )
}
  