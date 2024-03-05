import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Login } from './login/Login'
import { NotFound } from './404/NotFound'

export const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
            </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  