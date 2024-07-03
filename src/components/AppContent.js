import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner, CModal, CModalBody, CModalHeader, CModalFooter, CButton } from '@coreui/react'
import axios from 'axios';

// routes config
import routes from '../routes'

const AppContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [extendSession, setExtendSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExp = localStorage.getItem('token_exp');
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenExp && (tokenExp - currentTime) <= 300) {
        if (tokenExp && (tokenExp - currentTime) <= 0) {
          handleLoginAgain();
        } else {
          setShowModal(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showModal]);

  const handleLoginAgain = () => {
    navigate('/logout');
    setShowModal(false);
  };

  const handleExtend = async () => {
    try {
      const response = await axios.get('https://smrapiii.000webhostapp.com/refresh_token', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('token_exp', response.data.token_exp);
        setExtendSession(true);
        setShowModal(false);
      } else {
        console.log('Failed to extend session');
      }
    } catch (error) {
      console.log('Error extending session:', error);
    }
  };

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color='primary'/>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
        </Routes>
      </Suspense>
      <CModal visible={showModal} onClose={() => { setShowModal(false); extendSession ? null : handleLoginAgain(); }}>
        <CModalHeader>
          Sesi Anda Telah Berakhir
        </CModalHeader>
        <CModalBody>
          Sesi Anda telah berakhir, silakan login kembali untuk melanjutkan.
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" className='ms-3' onClick={handleExtend}>Perpanjang Sesi</CButton>
          <CButton color="danger" className='ms-3 text-white' onClick={handleLoginAgain}>Logout</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default React.memo(AppContent)
