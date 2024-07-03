import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCardFooter, CCol, CRow, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CBadge } from '@coreui/react'
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilCheck } from '@coreui/icons'
import Select from 'react-select';

const LaporanHarian = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [kegiatan, setKegiatan] = useState({});
  const [target, setTarget] = useState([]);
  const [tugas, setTugas] = useState([]);
  const [selectedTugas, setSelectedTugas] = useState([]);
  const [laporan, setLaporan] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await axios.get('http://smrapi.my.id//daftar_kegiatan/' + localStorage.getItem('kegiatan_id'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setKegiatan(response.data);
        generateWeeks(response.data.tgl_mulai, response.data.tgl_selesai);
        const hitungMinggu = (startDate) => {
          const start = new Date(startDate);
          const now = new Date();
          const diffTime = Math.abs(now - start);
          const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
          return diffWeeks;
        };
      const mingguSejakMulai = hitungMinggu(response.data.tgl_mulai);
      setActiveKey(mingguSejakMulai-1);
      } catch (error) {
        console.error('Error fetching kegiatan:', error);
      }
    };
    const fetchTarget = async () => {
      try {
        const response = await axios.get('http://smrapi.my.id//target/' + localStorage.getItem('kegiatan_id'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTarget(response.data);
      } catch (error) {
        console.error('Error fetching target:', error);
      }
    };
    const fetchLaporan = async () => {
      try {
        const response = await axios.get('http://smrapi.my.id//laporan_harian/' + localStorage.getItem('kegiatan_id'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLaporan(response.data);
      } catch (error) {
        console.error('Error fetching laporan:', error);
      }
    };
    fetchKegiatan();
    fetchTarget();
    fetchLaporan();

  }, []);

  useEffect(() => {
    generateWeeks(kegiatan.tgl_mulai, kegiatan.tgl_selesai);
  }, [laporan]);

  const handleSelectDay = (day) => {
    setShowModal(true);
    setSelectedDay(day);
    handleTugas(day);
    setIsEdit(day.laporanHarian.length > 0);
  };

  const handleTugas = (hari) => {
    const tanggal = new Date(hari.date).toISOString().split('T')[0];
    const targetTugas = target.filter(t => {
      return new Date(tanggal) >= new Date(t.target_mulai) && new Date(tanggal) <= new Date(t.target_selesai);
    });
    const Tugas = targetTugas[0].tugas;
    setTugas(Tugas.map(t => ({ value: t.id_tugas, label: t.nama_tugas })));
  };

  const generateWeeks = (startDate, endDate) => {
    const weeks = [];
    let currentDate = new Date(startDate);
    let weekIndex = 1;
    while (currentDate <= new Date(endDate)) {
      let week = { hari: [], startDate: null, endDate: null };
      for (let i = 0; i < 7; i++) {
        if (currentDate > new Date(endDate)) break;
        if(i==0) week.startDate = currentDate.toLocaleDateString('id-ID',{
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        });
        if(i==6 || currentDate.getTime() === new Date(endDate).getTime()) week.endDate = currentDate.toLocaleDateString('id-ID',{
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        });
        week.hari.push({ date: new Date(currentDate), nama: currentDate.toLocaleDateString('id-ID',{
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        }), laporanHarian: laporan.filter(l => l.tanggal === currentDate.toISOString().split('T')[0]),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if(new Date() < new Date(week.endDate) && new Date() > new Date(week.startDate)){
        setActiveKey(weekIndex);
      }
      weeks.push(week);
      weekIndex++;
    }
    setWeeks(weeks);
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedTugas(selectedOptions);
  };

  const handleAddSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('id_kegiatan', localStorage.getItem('kegiatan_id'));
      formData.append('tugas', selectedTugas.map(t => t.value));
      formData.append('tanggal', selectedDay.date.toISOString().split('T')[0]);
      formData.append('deskripsi_laporan', event.target.description.value);
      const response = await axios.post('http://smrapi.my.id//laporan_harian', formData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      setSelectedTugas([]);
      setLaporan(response.data);
      setShowModal(false);
      setSelectedDay(0);
      } catch (error) {
        console.error('Error submit laporan:', error);
      }
  };

  const handleUpdateSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('id_kegiatan', localStorage.getItem('kegiatan_id'));
      formData.append('tugas', selectedTugas.map(t => t.value));
      formData.append('deskripsi_laporan', event.target.description.value);
      const response = await axios.put('http://smrapi.my.id//laporan_harian/'+selectedDay.laporanHarian[0].id, formData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSelectedTugas([]);
        setLaporan(response.data);
        setShowModal(false);
        setIsEdit(false);
        setSelectedDay(0);
      } catch (error) {
        console.error('Error update laporan:', error);
      }
  };

  return (
    <CRow>
      <CCol sm="4" className='mb-2'>
        <CCard>
          <CCardHeader>
            Informasi Kegiatan
          </CCardHeader>
          <CCardBody>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody className='w-100'>
                <tr className='w-100'>
                  <td style={{ width: '45%', wordWrap: 'break-word', verticalAlign: 'top' ,fontWeight: 'bold'}}>Judul Kegiatan</td>
                  <td style={{ width: '5%', verticalAlign: 'top' }}>:</td>
                  <td style={{ wordWrap: 'break-word', verticalAlign: 'top' }}>{kegiatan.nama_kegiatan}</td>
                </tr>
                <tr className='w-100'>
                  <td style={{ width: '45%', wordWrap: 'break-word', verticalAlign: 'top' ,fontWeight: 'bold'}}>Deskripsi</td>
                  <td style={{ width: '5%', verticalAlign: 'top' }}>:</td>
                  <td style={{ wordWrap: 'break-word', verticalAlign: 'top' }}>{kegiatan.deskripsi}</td>
                </tr>
                <tr className='w-100'>
                  <td style={{ width: '45%', wordWrap: 'break-word', verticalAlign: 'top' ,fontWeight: 'bold'}}>Tanggal Mulai</td>
                  <td style={{ width: '5%', verticalAlign: 'top' }}>:</td>
                  <td style={{ wordWrap: 'break-word', verticalAlign: 'top' }}>{new Date(kegiatan.tgl_mulai).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  })}</td>
                </tr>
                <tr className='w-100'>
                  <td style={{ width: '45%', wordWrap: 'break-word', verticalAlign: 'top' ,fontWeight: 'bold'}}>Tanggal Selesai</td>
                  <td style={{ width: '5%', verticalAlign: 'top' }}>:</td>
                  <td style={{ wordWrap: 'break-word', verticalAlign: 'top' }}>{new Date(kegiatan.tgl_selesai).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  })}</td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="8">
        <CAccordion activeItemKey={activeKey}>
          {weeks.map((minggu, index) => (
            <CAccordionItem itemKey={index}>
                <CAccordionHeader>
                Minggu ke-{index + 1} ({minggu.startDate} - {minggu.endDate})
                {new Date() > new Date(minggu.endDate) && (
                  <CBadge color="danger" className="ms-3"><CIcon icon={cilLockLocked} className="me-1" />Terkunci</CBadge>
                )}
                </CAccordionHeader>
                <CAccordionBody>
                  {minggu.hari.map((hari, idx) => (
                    <CCard key={idx} className="mb-2">
                      <CCardHeader>
                        <div className='d-flex justify-content-between w-100'>
                          Tanggal {hari.nama}
                          {new Date().getTime() > new Date(minggu.endDate).getTime() && (
                          <CBadge color="danger" className="align-self-center py-2 ms-3"><CIcon icon={cilLockLocked} className="me-1" />Terkunci</CBadge>
                          )}
                        </div>
                      </CCardHeader>
                      <CCardBody className='d-flex justify-content-between'>
                        <div className='d-flex flex-column w-100 ms-3'>
                          {hari.laporanHarian.length > 0 && (
                            <CCard className='mb-2 mx-0'>
                              <CCardHeader className='d-flex justify-content-between'>
                                <b>Laporan Hari ini : </b>
                                {hari.laporanHarian.length > 0 && hari.laporanHarian[0].status === 'valid' && (
                                  <CBadge color="success" className="ms-3"><CIcon icon={cilCheck} className="me-1" />{hari.laporanHarian[0].status.charAt(0).toUpperCase() + hari.laporanHarian[0].status.slice(1)}</CBadge>
                                )}
                              </CCardHeader>
                              <CCardBody>
                                <p className='ms-3'>{hari.laporanHarian[0].deskripsi_laporan}</p>
                              </CCardBody>
                              <CCardFooter>
                                <span className='align-self-center py-2 fw-bold'> Tugas :</span>
                                {hari.laporanHarian[0].tugas.map((tugas, idx) => (
                                  <CBadge key={idx} color='success' className='ms-2'><CIcon icon={cilCheck} className='me-1' />{tugas.nama_tugas}</CBadge>
                                ))}
                              </CCardFooter>
                            </CCard>
                          )}
                          <button type="button" className="btn btn-primary w-25 ms-auto" onClick={() => handleSelectDay(hari)} disabled={(new Date().getTime() <= hari.date.getTime()) || (new Date().getTime() >= new Date(minggu.endDate).getTime()) || (hari.laporanHarian.length > 0 && hari.laporanHarian[0].status === 'valid')}>
                            {hari.laporanHarian.length > 0 ? 'Ubah Laporan' : 'Isi Laporan'}
                          </button>
                        </div>
                      </CCardBody>
                    </CCard>
                  ))}
                </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      </CCol>
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          Laporan Tanggal {selectedDay.nama}
        </CModalHeader>
        <CModalBody>
          <form onSubmit={isEdit ? handleUpdateSubmit : handleAddSubmit}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Deskripsi</label>
              <textarea className="form-control" id="description" name='deskripsi_laporan' rows="3" required defaultValue={isEdit ? selectedDay?.laporanHarian[0].deskripsi_laporan : ''}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tugasTerlaksana" className="form-label">Tugas Terlaksana</label>
              <Select
                isMulti
                required
                name="tugasTerlaksana"
                options={tugas}
                onChange={handleMultiSelectChange}
                defaultValue={isEdit ? tugas.filter(option => selectedDay?.laporanHarian[0].tugas.flatMap(t => t.id_daftar_tugas).includes(option.value)) : null}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <CButton color="success" type="submit" className="float-end">Submit</CButton>
          </form>
        </CModalBody>
      </CModal>
    </CRow>
  )
}

export default LaporanHarian
