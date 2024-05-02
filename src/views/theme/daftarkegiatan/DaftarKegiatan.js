import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CFormInput, CInputGroup, CInputGroupText, CBadge } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const DaftarKegiatan = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
        else if (row.status === 'Tertunda') color = 'danger';
        return <CBadge color={color}>{row.status}</CBadge>;
      },
      sortable: true,
      width: '13%'
    },
  ];

  const data = [
    { id: 1, nama: 'Penanganan Bencana Banjir', lokasi: 'Bandar Lampung', anggaran: 125000000, mulai: '17-10-2022', selesai: '18-11-2022', status: 'Dalam Proses' },
    { id: 2, nama: 'Penanganan Bencana Gempa', lokasi: 'Lampung Barat', anggaran: 375000000, mulai: '20-10-2022', selesai: '21-11-2022', status: 'Selesai' },
    { id: 3, nama: 'Penanganan Bencana Tsunami', lokasi: 'Aceh', anggaran: 500000000, mulai: '24-12-2022', selesai: '25-01-2023', status: 'Tertunda' },
    { id: 4, nama: 'Pembangunan Jembatan', lokasi: 'Sumatra Utara', anggaran: 200000000, mulai: '01-01-2023', selesai: '01-02-2023', status: 'Dalam Proses' },
    { id: 5, nama: 'Pembangunan Sekolah', lokasi: 'Jawa Barat', anggaran: 300000000, mulai: '05-01-2023', selesai: '05-03-2023', status: 'Dalam Proses' },
    { id: 6, nama: 'Rehabilitasi Rumah Sakit', lokasi: 'Bali', anggaran: 150000000, mulai: '10-01-2023', selesai: '10-04-2023', status: 'Selesai' },
    { id: 7, nama: 'Pembangunan Taman Kota', lokasi: 'Kalimantan Timur', anggaran: 80000000, mulai: '15-01-2023', selesai: '15-02-2023', status: 'Tertunda' },
    { id: 8, nama: 'Renovasi Pasar', lokasi: 'Sulawesi Selatan', anggaran: 50000000, mulai: '20-01-2023', selesai: '20-03-2023', status: 'Dalam Proses' },
    { id: 9, nama: 'Pembangunan Perpustakaan', lokasi: 'Papua', anggaran: 250000000, mulai: '25-01-2023', selesai: '25-04-2023', status: 'Selesai' },
    { id: 10, nama: 'Pembangunan Jalan Tol', lokasi: 'Jawa Tengah', anggaran: 1000000000, mulai: '01-02-2023', selesai: '01-05-2023', status: 'Tertunda' },
    { id: 11, nama: 'Penanganan Bencana Kebakaran', lokasi: 'Jakarta', anggaran: 600000000, mulai: '05-02-2023', selesai: '05-03-2023', status: 'Dalam Proses' },
    { id: 12, nama: 'Pembangunan Rumah Pintar', lokasi: 'Yogyakarta', anggaran: 400000000, mulai: '10-02-2023', selesai: '10-05-2023', status: 'Selesai' },
    { id: 13, nama: 'Pembangunan Sarana Olahraga', lokasi: 'Nusa Tenggara Barat', anggaran: 350000000, mulai: '15-02-2023', selesai: '15-04-2023', status: 'Tertunda' },
    { id: 14, nama: 'Pembangunan Pusat Kebudayaan', lokasi: 'Sumatra Selatan', anggaran: 450000000, mulai: '20-02-2023', selesai: '20-05-2023', status: 'Dalam Proses' },
    { id: 15, nama: 'Renovasi Museum', lokasi: 'Kalimantan Barat', anggaran: 500000000, mulai: '25-02-2023', selesai: '25-06-2023', status: 'Selesai' },
    { id: 16, nama: 'Pembangunan Dermaga', lokasi: 'Maluku', anggaran: 750000000, mulai: '01-03-2023', selesai: '01-06-2023', status: 'Tertunda' },
    { id: 17, nama: 'Pembangunan Pusat Perbelanjaan', lokasi: 'Banten', anggaran: 850000000, mulai: '05-03-2023', selesai: '05-07-2023', status: 'Dalam Proses' },
    { id: 18, nama: 'Pembangunan Stasiun', lokasi: 'Aceh', anggaran: 950000000, mulai: '10-03-2023', selesai: '10-08-2023', status: 'Selesai' },
    { id: 19, nama: 'Pembangunan Bandara', lokasi: 'Sulawesi Utara', anggaran: 2000000000, mulai: '15-03-2023', selesai: '15-09-2023', status: 'Tertunda' },
    { id: 20, nama: 'Pembangunan Pelabuhan', lokasi: 'Papua Barat', anggaran: 1800000000, mulai: '20-03-2023', selesai: '20-10-2023', status: 'Dalam Proses' },
    { id: 21, nama: 'Pembangunan Rumah Adat', lokasi: 'Kalimantan Tengah', anggaran: 500000000, mulai: '25-03-2023', selesai: '25-07-2023', status: 'Selesai' },
    { id: 22, nama: 'Pembangunan Kantor Pemerintahan', lokasi: 'Sulawesi Tengah', anggaran: 650000000, mulai: '01-04-2023', selesai: '01-08-2023', status: 'Tertunda' },
    { id: 23, nama: 'Pembangunan Pusat Data', lokasi: 'Jawa Timur', anggaran: 800000000, mulai: '05-04-2023', selesai: '05-09-2023', status: 'Dalam Proses' },
    { id: 24, nama: 'Pembangunan Pusat Riset', lokasi: 'Bali', anggaran: 1000000000, mulai: '10-04-2023', selesai: '10-10-2023', status: 'Selesai' },
    { id: 25, nama: 'Pembangunan Pusat Kesehatan', lokasi: 'Nusa Tenggara Timur', anggaran: 550000000, mulai: '15-04-2023', selesai: '15-08-2023', status: 'Tertunda' },
    { id: 26, nama: 'Pembangunan Pusat Teknologi', lokasi: 'Gorontalo', anggaran: 700000000, mulai: '20-04-2023', selesai: '20-09-2023', status: 'Dalam Proses' },
    { id: 27, nama: 'Pembangunan Pusat Seni', lokasi: 'Sumatra Barat', anggaran: 300000000, mulai: '25-04-2023', selesai: '25-08-2023', status: 'Selesai' },
    { id: 28, nama: 'Pembangunan Pusat Pendidikan', lokasi: 'Lampung', anggaran: 400000000, mulai: '01-05-2023', selesai: '01-09-2023', status: 'Tertunda' },
    { id: 29, nama: 'Pembangunan Pusat Perdagangan', lokasi: 'Riau', anggaran: 500000000, mulai: '05-05-2023', selesai: '05-10-2023', status: 'Dalam Proses' },
    { id: 30, nama: 'Pembangunan Pusat Hiburan', lokasi: 'Kalimantan Utara', anggaran: 600000000, mulai: '10-05-2023', selesai: '10-11-2023', status: 'Selesai' },
  ];

  useEffect(() => {
    setFilteredData(data.filter(item => item.nama.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, data]);

  const customStyles = {
    headCells: {
      style: {
        textAlign: 'center',
        padding: '0',
        fontSize: '12px',
        fontWeight: 'bold',
        justifyContent: 'center',
      },
    },
    cells: {
      style: {
        textAlign: 'center',
        justifyContent: 'start',
      },
    },
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
        </CRow>
      </CRow>
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        pagination
      />
    </CCard>
  )
}

export default DaftarKegiatan
