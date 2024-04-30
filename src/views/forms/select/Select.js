import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CProgressBar } from '@coreui/react'

const Select = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <CRow>
      <CCol sm="4" style={{ height: '100vh', overflow: 'hidden' }}>
        <CCard>
          <CCardHeader>
            Informasi Kegiatan
          </CCardHeader>
          <CCardBody>
            Judul Kegiatan: Kegiatan Hari {selectedDay}
            <br />
            Deskripsi: Deskripsi kegiatan yang sedang berjalan.
            <br />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="8" style={{ height: '100vh', overflowY: 'auto' }}>
        {Array.from({ length: 7 }, (_, i) => (
          <CCard key={i} className="mb-2">
            <CCardHeader>
              Hari {i + 1}
            </CCardHeader>
            <CCardBody>
              <button type="button" className="btn btn-primary" onClick={() => { setShowModal(true); setSelectedDay(i + 1) }}>
                Isi Laporan
              </button>
            </CCardBody>
          </CCard>
        ))}
      </CCol>
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          Laporan Hari {selectedDay}
        </CModalHeader>
        <CModalBody>
          <form>
            <div className="mb-3">
              <label htmlFor="activityName" className="form-label">Nama Kegiatan</label>
              <input type="text" className="form-control" id="activityName" />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Lokasi</label>
              <input type="text" className="form-control" id="location" />
            </div>
            <div className="mb-3">
              <label htmlFor="teamLead" className="form-label">Ketua Tim</label>
              <input type="text" className="form-control" id="teamLead" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Deskripsi</label>
              <textarea className="form-control" id="description" rows="3"></textarea>
            </div>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setShowModal(false)}>Submit</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Select
