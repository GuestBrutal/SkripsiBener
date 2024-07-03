import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilChevronRight } from '@coreui/icons';

const DetailLaporanMingguan = ({props, setShowModal, setShowLaporan, setLaporan}) => {
  const [laporanMingguan, setLaporanMingguan] = useState({});
  const kegiatan = props;

  useEffect(() => {
    const fetchLaporanHarian = async () => {
      try {
        const response = await axios.get('https://smrapiii.000webhostapp.com/laporan_harian/'+kegiatan.no, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const laporanHarian = response.data;
        const laporanPerMinggu = laporanHarian.reduce((acc, laporan) => {
          const minggu = new Date(laporan.tanggal).getWeek();
          if (!acc[minggu]) {
            acc[minggu] = [];
          }
          acc[minggu].push(laporan);
          return acc;
        }, {});
        setLaporanMingguan(laporanPerMinggu);
      } catch (error) {
        console.error('Error fetching laporan harian:', error);
      }
    };
    fetchLaporanHarian();
  }, []);

  const handleDetail = (laporan) => {
    setLaporan(laporan);
    setShowModal(false);
    setShowLaporan(true);
  };

  Date.prototype.getWeek = function() {
    const startDate = new Date(kegiatan.tgl_mulai);
    const endDate = new Date(kegiatan.tgl_selesai);
    const currentDate = new Date(this);
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
  };

  return (
    <>
      {Object.keys(laporanMingguan).map((minggu, index) => (
        <CCard key={index} className="mb-2">
          <button className="btn d-flex justify-content-between align-items-center p-2 ps-3" onClick={() => handleDetail(laporanMingguan[minggu])}>
            <span className='fw-bold'>Laporan Minggu ke-{parseInt(minggu)+1}</span>
            <CIcon icon={cilChevronRight} />
          </button>
        </CCard>
      ))}
    </>
  );
};

export default DetailLaporanMingguan;
