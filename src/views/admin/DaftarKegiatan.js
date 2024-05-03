import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CFormInput, CInputGroup, CInputGroupText, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormLabel, CFormSelect } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus } from '@coreui/icons'

const DaftarKegiatan = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalTambah, setModalTambah] = useState(false);
  const [data, setData] = useState([
    { id: 1, nama: 'Penanganan Bencana Banjir', lokasi: 'Bandar Lampung', anggaran: 125000000, mulai: '17-10-2022', selesai: '18-11-2022', status: 'Dalam Proses' },
    { id: 2, nama: 'Penanganan Bencana Gempa', lokasi: 'Lampung Barat', anggaran: 375000000, mulai: '20-10-2022', selesai: '21-11-2022', status: 'Selesai' },
    { id: 3, nama: 'Penanganan Bencana Tsunami', lokasi: 'Aceh', anggaran: 500000000, mulai: '24-12-2022', selesai: '25-01-2023', status: 'Tertunda' },
  ]);
  const [kegiatanBaru, setKegiatanBaru] = useState({
    nama: '',
    lokasi: '',
    anggaran: 0,
    mulai: '',
    selesai: '',
    status: ''
  });

  useEffect(() => {
    setFilteredData(data.filter(item => item.nama.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, data]);

  const columns = [
    { name: 'No', selector: row => row.id, sortable: true, width: '7.5%' },
    { name: 'Nama Kegiatan', selector: row => row.nama, sortable: true, width: '25%' },
    { name: 'Lokasi', selector: row => row.lokasi, sortable: true, width: '20%' },
    {
      name: 'RAB', selector: row => `Rp. ${row.anggaran.toLocaleString('id-ID')}`, sortable: true
      , width: '20%'
    },
    { name: 'Tanggal Mulai', selector: row => row.mulai, sortable: true, width: '15%' },
    { name: 'Tanggal Selesai', selector: row => row.selesai, sortable: true, width: '15%' },
    {
      name: 'Status',
      selector: row => {
        let color = '';
        if (row.status === 'Dalam Proses') color = 'warning';
        else if (row.status === 'Selesai') color = 'success';
        else color = 'danger';
        return <CBadge color={color}>{row.status}</CBadge>;
      },
      sortable: true,
      width: '13%'
    },
  ];

  const handleTambahKegiatan = () => {
    const newId = data.length + 1;
    const newData = { id: newId, ...kegiatanBaru };
    setData([...data, newData]);
    setModalTambah(false);
    setKegiatanBaru({
      nama: '',
      lokasi: '',
      anggaran: 0,
      mulai: '',
      selesai: '',
      status: ''
    });
  };

  const handleChange = (e) => {
    setKegiatanBaru({ ...kegiatanBaru, [e.target.id]: e.target.value });
  };

  return (
    <CCard className="p-4 m-3" sm={6}>
      <CRow className='justify-content-between pb-3'>
        <CCol sm={8} className='w-50'>
          <h4>Daftar Kegiatan</h4>
        </CCol>
        <CRow className='w-50 justify-content-end'>
          <CCol sm={12} className='w-75'>
            <CInputGroup>
              <CFormInput
                type="text"
                placeholder="Cari Nama Kegiatan..."
                onChange={e => setSearchText(e.target.value)}
              />
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>
            </CInputGroup>
          </CCol>
          <CCol sm={12} className='w-25'>
            <CButton color="success" onClick={() => setModalTambah(true)}>
              <CIcon icon={cilPlus} />
            </CButton>
          </CCol>
        </CRow>
      </CRow>
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={{
          headCells: {
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          },
          cells: {
            style: {
              textAlign: 'center',
              padding: '10px',
            },
          },
        }}
        pagination
      />
      <CModal visible={modalTambah} onClose={() => setModalTambah(false)}>
        <CModalHeader closeButton>Tambah Kegiatan Baru</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="nama">Nama Kegiatan</CFormLabel>
            <CFormInput type="text" id="nama" placeholder="Masukkan nama kegiatan" required value={kegiatanBaru.nama} onChange={handleChange} />

            <CFormLabel htmlFor="lokasi"> Lokasi </CFormLabel>
            <CFormInput type="text" id="lokasi" placeholder="Masukkan lokasi kegiatan" required value={kegiatanBaru.lokasi} onChange={handleChange} />

            <CFormLabel htmlFor="anggaran">Anggaran</CFormLabel>
            <CFormInput type="number" id="anggaran" placeholder="Masukkan anggaran kegiatan" required value={kegiatanBaru.anggaran} onChange={handleChange} />

            <CFormLabel htmlFor="mulai">Tanggal Mulai</CFormLabel>
            <CFormInput type="date" id="mulai" required value={kegiatanBaru.mulai} onChange={handleChange} />

            <CFormLabel htmlFor="selesai">Tanggal Selesai</CFormLabel>
            <CFormInput type="date" id="selesai" required value={kegiatanBaru.selesai} onChange={handleChange} />

            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect id="status" required value={kegiatanBaru.status} onChange={handleChange}>
              <option value="">Pilih status kegiatan</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleTambahKegiatan}>Simpan</CButton>
          <CButton color="secondary" onClick={() => setModalTambah(false)}>Batal</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default DaftarKegiatan
