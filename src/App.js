import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-4 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/auth/Login'))
const Register = React.lazy(() => import('./views/auth/Register'))
const DaftarKoordinator = React.lazy(() => import('./views/auth/DaftarKoordinator'))
const Page404 = React.lazy(() => import('./views/pages/Page404'))
const Page500 = React.lazy(() => import('./views/pages/Page500'))
const Logout = React.lazy(() => import('./views/auth/Logout'))

class App extends Component {
  render() {
    const token = localStorage.getItem('token');

    return (
        <Suspense fallback={loading}>
          <Router>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/logout" name="Logout Page" element={<Logout />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/daftar-koordinator" name="Daftar Koordinator" element={<DaftarKoordinator />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="*" element={token ? <DefaultLayout /> : <Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </Suspense>
    )
  }
}

export default App
