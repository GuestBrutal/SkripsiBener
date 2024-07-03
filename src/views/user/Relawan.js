import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilZoom, cilCheckCircle } from '@coreui/icons'
import relawan from 'src/assets/images/relawan.jpg'

const Relawan = () => {
  const [modal, setModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activeActivities, setActiveActivities] = useState([]);

  useEffect(() => {
    const fetchActiveActivities = async (data) => {
      try {
        const userId = localStorage.getItem('UID');
        const response = await axios.get(`https://smrapiii.000webhostapp.com/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setActiveActivities(data.filter(item => item.no === response.data.kegiatan_id));
        setActivities(data.filter(item => item.no !== response.data.kegiatan_id));
      } catch (error) {
        console.error('Error fetching active activities:', error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get('https://smrapiii.000webhostapp.com/daftar_kegiatan', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const userId = localStorage.getItem('UID');
        const activitiesWithRegistration = response.data.map(activity => {
          if (activity.user.filter(user => user.user_id === userId).length > 0) {
            return { ...activity, registered: true };
          }
          return activity;
        });
        fetchActiveActivities(activitiesWithRegistration);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleDetails = (activity) => {
    setSelectedActivity(activity);
    setModal(true);
  };

  const handleRegister = (activityId) => {
    const updatedActivities = activities.map(activity => {
      if (activity.no === activityId) {
        return { ...activity, registered: true };
      }
      return activity;
    });
    setActivities(updatedActivities);
    const register = async () => {
      try {
        const response = await axios.post('https://smrapiii.000webhostapp.com/user/register_kegiatan', {
          user_id: localStorage.getItem('UID'),
          kegiatan_id: activityId
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchActiveActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }
    register();
  };


  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Kegiatan Aktif</CCardHeader>
        <CCardBody>
          <CRow>
            {activeActivities.map((activity) => (
              <CCol key={activity.no} xs={12} sm={6} lg={3}>
                <CCard className="mb-4 p-3">
                  <img src={relawan} alt="Activity Cover" style={{ width: '100%' }} />
                  <CCardBody>
                    <h6 className='mb-5' style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)' }}>{activity.nama_kegiatan}</h6>
                    <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                      <CButton color="primary" onClick={() => handleDetails(activity)}>
                        <CIcon icon={cilZoom} />
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Kegiatan Teregistrasi</CCardHeader>
        <CCardBody>
          <CRow>
            {activities.filter(activity => activity.registered).map((activity) => (
              <CCol key={activity.no} xs={12} sm={6} lg={3}>
                <CCard className="mb-4 p-3">
                  <img src={relawan} alt="Activity Cover" style={{ width: '100%' }} />
                  <CCardBody>
                    <h6 className='mb-5' style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)' }}>{activity.nama_kegiatan}</h6>
                    <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                      <CButton color="primary" onClick={() => handleDetails(activity)}>
                        <CIcon icon={cilZoom} />
                        <CBadge color="warning" shape="pill" className="m-2">Menunggu Validasi</CBadge>
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Kegiatan Tersedia</CCardHeader>
        <CCardBody>
          <CRow>
            {activities.filter(activity => !activeActivities.some(active => activeActivities.no === activity.no) && !activity.registered).map((activity) => (
              <CCol key={activity.no} xs={12} sm={6} lg={3}>
                <CCard className="mb-4 p-3">
                  <img src={relawan} alt="Activity Cover" style={{ width: '100%' }} />
                  <CCardBody>
                    <h6 className='mb-5' style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)' }}>{activity.nama_kegiatan}</h6>
                    <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                      <CButton color="primary" onClick={() => handleDetails(activity)}>
                        <CIcon icon={cilZoom} />
                      </CButton>
                      <CButton color="success" onClick={() => handleRegister(activity.no)} className="ms-2">
                        <CIcon icon={cilCheckCircle} /> Daftar
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader closeButton>
          {selectedActivity?.nama_kegiatan}
        </CModalHeader>
        <CModalBody>
          <p>{selectedActivity?.deskripsi}</p>
          <p>Start: {selectedActivity?.tgl_mulai}</p>
          <p>End: {selectedActivity?.tgl_selesai}</p>
          <p>Location: {selectedActivity?.lokasi}</p>
        </CModalBody>
        <CModalFooter>
          {!activeActivities.includes(selectedActivity) && !selectedActivity?.registered && <CButton color="success" onClick={() => { handleRegister(selectedActivity?.no); setModal(false) }}>Daftar</CButton>}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Relawan
