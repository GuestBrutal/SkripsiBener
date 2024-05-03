import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CBadge
} from '@coreui/react'

const LaporanMingguan = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [validatedDays, setValidatedDays] = useState([]);

  const handleValidate = (day) => {
    setShowModal(false);
    setValidatedDays([...validatedDays, day]);
  };

  const handleSendReport = () => {
    // Fungsi untuk mengirim laporan ke admin
    console.log("Mengirim laporan yang telah divalidasi ke admin.");
  };

  return (
    <CRow>
      <CCol sm="6" style={{ height: '75vh', overflowY: 'auto' }}>
        {Array.from({ length: 7 }, (_, i) => (
          !validatedDays.includes(i + 1) && (
            <CCard key={i} className="mb-2">
              <CCardHeader>
                Hari {i + 1}
              </CCardHeader>
              <CCardBody>
                <button type="button" className="btn btn-primary" onClick={() => { setShowModal(true); setSelectedDay(i + 1) }}>
                  Validasi Laporan
                </button>
              </CCardBody>
            </CCard>
          )
        ))}
      </CCol>
      <CCol sm="6" style={{ height: '75vh', overflowY: 'auto' }}>
        {validatedDays.map(day => (
          <CCard key={day} className="mb-2">
            <CCardHeader>
              Hari {day} <CBadge color="success">Valid</CBadge>
            </CCardHeader>
          </CCard>
        ))}
        {validatedDays.length === 7 && (
          <CButton color="primary" onClick={handleSendReport} className="mt-3">
            Kirim Laporan ke Admin
          </CButton>
        )}
      </CCol>
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          Validasi Laporan Hari {selectedDay}
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="activityName">Nama Kegiatan</CFormLabel>
              <CFormInput type="text" id="activityName" disabled value="Penanganan Bencana Banjir Kalianda" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="location">Lokasi</CFormLabel>
              <CFormInput type="text" id="location" disabled value="Kec. Kalianda, Kabupaten Lampung Selatan, Lampung 35551" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="teamLead">Ketua Tim</CFormLabel>
              <CFormInput type="text" id="teamLead" disabled value="Tristiyanto" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="description">Deskripsi</CFormLabel>
              <CFormTextarea id="description" rows="3" disabled value="Deskripsi kegiatan yang dilakukan..."></CFormTextarea>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => handleValidate(selectedDay)}>Validasi</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default LaporanMingguan

