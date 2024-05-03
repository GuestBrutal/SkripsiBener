import React, { useState } from 'react'
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
  const [activities, setActivities] = useState([
    { id: 1, title: 'Pembersihan Pantai', cover: relawan, registered: false, description: 'Pembersihan sampah di pantai lokal.', mulai: '17-10-2022', selesai: '18-11-2022', location: 'Pantai Kuta' },
    { id: 2, title: 'Penanaman Pohon', cover: relawan, registered: true, description: 'Penanaman pohon di area hutan.', mulai: '10-11-2022', selesai: '11-12-2022', location: 'Hutan Bakau' },
    { id: 3, title: 'Pendidikan Anak', cover: relawan, registered: false, description: 'Mengajar anak-anak di daerah terpencil.', mulai: '08-10-2022', selesai: '09-11-2022', location: 'Sekolah Dasar Negeri 1' },
    { id: 4, title: 'Distribusi Makanan', cover: relawan, registered: true, description: 'Distribusi makanan untuk warga tidak mampu.', mulai: '12-11-2022', selesai: '13-12-2022', location: 'Panti Asuhan Amanah' },
    // Data kegiatan sama seperti sebelumnya
  ]);

  const handleDetails = (activity) => {
    setSelectedActivity(activity);
    setModal(true);
  };

  const handleRegister = (activityId) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === activityId) {
        return { ...activity, registered: true };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Kegiatan Teregistrasi</CCardHeader>
        <CCardBody>
          <CRow>
            {activities.filter(activity => activity.registered).map((activity) => (
              <CCol key={activity.id} xs={12} sm={6} lg={3}>
                <CCard className="mb-4 p-3">
                  <img src={activity.cover} alt="Activity Cover" style={{ width: '100%' }} />
                  <CCardBody>
                    <h6 className='mb-5' style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)' }}>{activity.title}</h6>
                    <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                      <CButton color="primary" onClick={() => handleDetails(activity)}>
                        <CIcon icon={cilZoom} />
                        <CBadge color="warning" shape="pill" className="ms-2">Menunggu Validasi</CBadge>
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
            {activities.filter(activity => !activity.registered).map((activity) => (
              <CCol key={activity.id} xs={12} sm={6} lg={3}>
                <CCard className="mb-4 p-3">
                  <img src={activity.cover} alt="Activity Cover" style={{ width: '100%' }} />
                  <CCardBody>
                    <h6 className='mb-5' style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)' }}>{activity.title}</h6>
                    <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                      <CButton color="primary" onClick={() => handleDetails(activity)}>
                        <CIcon icon={cilZoom} />
                      </CButton>
                      <CButton color="success" onClick={() => handleRegister(activity.id)} className="ms-2">
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
          {selectedActivity?.title}
        </CModalHeader>
        <CModalBody>
          <p>{selectedActivity?.description}</p>
          <p>Start: {selectedActivity?.mulai}</p>
          <p>End: {selectedActivity?.selesai}</p>
          <p>Location: {selectedActivity?.location}</p>
        </CModalBody>
        <CModalFooter>
          {!selectedActivity?.registered && <CButton color="success" onClick={() => { handleRegister(selectedActivity?.id); setModal(false)}}>Daftar</CButton>}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Relawan
