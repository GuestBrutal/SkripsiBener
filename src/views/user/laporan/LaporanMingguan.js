import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardFooter,
  CModalTitle,
  CCol,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CBadge
} from '@coreui/react'
import axios from 'axios';
import relawan from 'src/assets/images/relawan.jpg'
import DetailLaporanMingguan from './DetailLaporanMingguan';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';

const LaporanMingguan = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [kegiatan, setKegiatan] = useState([]);
  const [validatedKegiatan, setValidatedKegiatan] = useState([]);
  const [showLaporan, setShowLaporan] = useState(false);
  const [laporan, setLaporan] = useState({});

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await axios.get('http://localhost:8080/daftar_kegiatan', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setKegiatan(response.data);
      } catch (error) {
        console.error('Error fetching kegiatan:', error);
      }
    };
    fetchKegiatan();
  }, []);

  return (
    <CRow>
      <CCol sm="3">
        {kegiatan.map((item) => (
          !validatedKegiatan.includes(item.no) && (
            <CCard key={item.no} className="mb-2" >
              <CCardBody>
                <img src={relawan} alt="Relawan" className="img-fluid" />
                <h5 className='mt-2 fw-bold mb-0'>{item.nama_kegiatan}</h5>
                <span className='text-muted fw-bold'>{item.lokasi}</span>
              </CCardBody>
              <CCardFooter>
                <button type="button" className="btn btn-primary w-100" onClick={() => { setShowModal(true); setSelectedKegiatan(item) }}>
                  Lihat Laporan
                </button>
              </CCardFooter>
            </CCard>
          )
        ))}
      </CCol>
      <CModal
        visible={showModal}
        onClose={() => {setShowModal(false);}}
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Laporan Mingguan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DetailLaporanMingguan props={selectedKegiatan} setShowModal = {setShowModal} setShowLaporan = {setShowLaporan} setLaporan = {setLaporan} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {setShowModal(false)}}>
            Tutup
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={showLaporan} onClose={() => setShowLaporan(false)}>
        <CModalHeader>
          <h5>Daftar Laporan Harian</h5>
        </CModalHeader>
        <CModalBody>
          {laporan.length > 0 && laporan.map((item, index) => (
            <CAccordion key={index} className='mb-2'>
              <CAccordionItem itemKey={index}>
                <CAccordionHeader>Laporan Tanggal {item.tanggal}</CAccordionHeader>
                <CAccordionBody>
                  <CCard className='mb-2'>
                    <CCardBody>
                      <p>{item.deskripsi_laporan}</p>
                    </CCardBody>
                    <CCardFooter>
                      <span className='align-self-center me-2 py-2 fw-bold'> Tugas :</span>
                      {item.tugas.map((tugas, idx) => (
                        <CBadge key={idx} color='success' className='me-2 mb-1'><CIcon icon={cilCheck} className='me-1' />{tugas.nama_tugas}</CBadge>
                      ))}
                    </CCardFooter>
                  </CCard>
                  <div className='d-flex justify-content-end'>
                    <CButton color="primary" onClick={() => setShowLaporan(false)}>
                      Validasi Laporan
                    </CButton>
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          ))}
        </CModalBody>
      </CModal>

    </CRow>
  )
}

export default LaporanMingguan
