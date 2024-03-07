import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Login } from './login/Login'
import { NotFound } from './404/NotFound'

export const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
  }
  