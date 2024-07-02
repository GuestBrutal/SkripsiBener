import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import relawan from 'src/assets/images/relawan.jpg'
import { cilLockLocked, cilUser, cilWarning } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', error: '' });
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!validateEmail(email)) {
      setFormData({ ...formData, error: 'Email Tidak Valid!' });
      return;
    }
    const url = 'https://smrapiii.000webhostapp.com/login/';
    try {
      const response = await axios.post(url, { email, password });
      if (response.data.status) {
        const { token, user, token_exp } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('token_exp', token_exp);
        localStorage.setItem('role', user.role);
        localStorage.setItem('kegiatan_id', (user.kegiatan_id !== null) ? user.kegiatan_id : 0);
        localStorage.setItem('UID', user.id);
        window.location.href = "/";
      } else {
        setFormData({ ...formData, error: response.data.message || 'Login failed' });
      }
    } catch (error) {
      setFormData({ ...formData, error: error.response.data.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCardGroup>
              <CCard className="text-white bg-dark p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Sistem Manajemen Relawan</h1>
                    <p className="text-medium-emphasis-white">Silahkan masuk ke akun anda</p>
                    {formData.error &&
                      <CAlert color="danger" className="d-flex align-items-center py-1">
                        <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={18} height={18} />
                        <div>{formData.error}</div>
                      </CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="" name="email" value={formData.email} onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="light" className="px-4">
                          Masuk
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Daftar</h2>
                    <Link to="/register">
                      <CImage fluid src={relawan} />
                      <CButton color="success text-white" className="mt-3" tabIndex={-1}>
                        Daftar Sekarang
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
