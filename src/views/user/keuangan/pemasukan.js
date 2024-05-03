import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const Pemasukan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    {
      id: 1,
      tanggal: '2022-10-17',
      deskripsi: 'Anggaran Relawan',
      sumberdana: 'RAB BNPB',
      jumlah: 5000000,
    },
    {
      id: 2,
      tanggal: '2022-10-20',
      deskripsi: 'Donasi',
      sumberdana: 'KitaBisa.com',
      jumlah: 2000000,
    },
    {
      id: 3,
      tanggal: '2022-10-22',
      deskripsi: 'Sumbangan Sukarela',
      sumberdana: 'Yayasan XYZ',
      jumlah: 3000000,
    },
  ]);

  const columns = [
    {
      name: 'No',
      selector: row => row.id,
      sortable: true,
      center: true,
    },
    {
      name: 'Tanggal',
      selector: row => row.tanggal,
      sortable: true,
      center: true,
      format: row => new Date(row.tanggal).toLocaleDateString(),
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi,
      sortable: true,
      center: true,
    },
    {
      name: 'Sumber Dana',
      selector: row => row.sumberdana,
      sortable: true,
      center: true,
    },
    {
      name: 'Jumlah',
      selector: row => `Rp. ${row.jumlah.toLocaleString('id-ID')}`,
      sortable: true,
      center: true,
    },
  ]

  useEffect(() => {
    if (data.length > 0) {
      const dates = data.map(item => new Date(item.tanggal));
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      setFilterDateRange({ start: minDate.toISOString().split('T')[0], end: maxDate.toISOString().split('T')[0] });
    }
  }, [data]);

 useEffect(() => {
  const filtered = data.filter(item => {
    const date = new Date(item.tanggal);
    const startDate = new Date(filterDateRange.start);
    const endDate = new Date(filterDateRange.end);
    return date >= startDate && date <= endDate && item.deskripsi.toLowerCase().includes(searchText.toLowerCase());
  });
  setFilteredData(filtered);
}, [filterDateRange, searchText, data]);

  const totalJumlah = filteredData.reduce((acc, curr) => acc + curr.jumlah, 0).toLocaleString('id-ID');

  const handleAddPemasukan = (tanggal, deskripsi, sumberdana, jumlah) => {
    const newEntry = {
      id: data.length + 1,
      tanggal,
      deskripsi,
      sumberdana,
      jumlah: parseInt(jumlah),
    };
    setData([...data, newEntry]);
    setModalVisible(false);
  };

  return (
    <CCard className="p-4 shadow-sm" sm={6}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4>Uang Masuk</h4>
        <CButton color="primary" onClick={() => setModalVisible(true)}>
          Tambah Pemasukan
        </CButton>
      </CCardHeader>
      <div className="p-3">
        <CRow className="justify-content-between">
          <CRow className="w-auto">
            <CCol xs="auto">
              <div className="mb-2">
                <label htmlFor="tanggalMulai">Tanggal Awal</label>
                <CFormInput id="tanggalMulai" type="date" size="sm" value={filterDateRange.start} onChange={e => setFilterDateRange(prev => ({ ...prev, start: e.target.value }))} />
              </div>
            </CCol>
            <CCol xs="auto">
              <div className="mb-2">
                <label htmlFor="tanggalAkhir">Tanggal Akhir</label>
                <CFormInput id="tanggalAkhir" type="date" size="sm" value={filterDateRange.end} min={filterDateRange.start} onChange={e => setFilterDateRange(prev => ({ ...prev, end: e.target.value }))} />
              </div>
            </CCol>
          </CRow>
          <CCol xs="auto">
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Cari Deskripsi..."
                onChange={e => setSearchText(e.target.value)}
              />
            </CInputGroup>
          </CCol>
        </CRow>
      </div>
      <CCardBody>
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
        <div className="text-center">
          <strong>Total: Rp. {totalJumlah}</strong>
        </div>
      </CCardBody>
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader closeButton>Tambah Pemasukan</CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <label htmlFor="tanggal" style={{fontSize: '14px'}}>Tanggal:</label>
            <CFormInput id="tanggal" type="date" placeholder="Masukkan Tanggal" />
          </div>
          <div className="mb-3">
            <label htmlFor="deskripsi" style={{fontSize: '14px'}}>Deskripsi:</label>
            <CFormInput id="deskripsi" type="text" placeholder="Masukkan Deskripsi" />
          </div>
          <div className="mb-3">
            <label htmlFor="sumberdana" style={{fontSize: '14px'}}>Sumber Dana:</label>
            <CFormInput id="sumberdana" type="text" placeholder="Masukkan Sumber Dana" />
          </div>
          <div className="mb-3">
            <label htmlFor="jumlah" style={{fontSize: '14px'}}>Jumlah:</label>
            <CFormInput id="jumlah" type="number" placeholder="Masukkan Jumlah" />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => handleAddPemasukan(document.getElementById('tanggal').value, document.getElementById('deskripsi').value, document.getElementById('sumberdana').value, document.getElementById('jumlah').value)}>Simpan</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Pemasukan
