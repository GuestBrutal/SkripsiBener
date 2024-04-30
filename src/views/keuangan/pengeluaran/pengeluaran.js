import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CButton, CCardHeader, CCardBody, CTable, CFormInput, CInputGroup, CInputGroupText, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const Pengeluaran = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

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
      name: 'Nota',
      selector: row => row.nota,
      sortable: true,
      center: true,
    },
    {
      name: 'Harga',
      selector: row => `Rp. ${row.harga.toLocaleString('id-ID')}`,
      sortable: true,
      center: true,
    },
    {
      name: 'Jumlah (Barang)',
      selector: row => row.banyakbarang,
      sortable: true,
      center: true,
    },
    {
      name: 'Total',
      selector: row => `Rp. ${row.total.toLocaleString('id-ID')}`,
      sortable: true,
      center: true,
    },
  ]
  const items = [
    {
      id: 1,
      tanggal: '2022-10-17',
      deskripsi: 'Beras',
      nota: 'Ada',
      harga: '17000',
      banyakbarang: '10',
      total: 170000,
    },
    {
      id: 2,
      tanggal: '2022-10-17',
      deskripsi: 'Minyak',
      nota: 'Ada',
      harga: '20000',
      banyakbarang: '2',
      total: 400000,
    },
    {
      id: 3,
      tanggal: '2022-10-17',
      deskripsi: 'Mie',
      nota: 'Ada',
      harga: '150000',
      banyakbarang: '3',
      total: 450000,
    },
    // Tambahkan data dummy tambahan
    {
      id: 4,
      tanggal: '2022-10-18',
      deskripsi: 'Gula',
      nota: 'Ada',
      harga: '12000',
      banyakbarang: '5',
      total: 60000,
    },
    {
      id: 5,
      tanggal: '2022-10-18',
      deskripsi: 'Susu',
      nota: 'Ada',
      harga: '25000',
      banyakbarang: '4',
      total: 100000,
    },
    {
      id: 6,
      tanggal: '2022-10-18',
      deskripsi: 'Telur',
      nota: 'Ada',
      harga: '5000',
      banyakbarang: '12',
      total: 60000,
    },
    {
      id: 7,
      tanggal: '2022-10-19',
      deskripsi: 'Roti',
      nota: 'Ada',
      harga: '8000',
      banyakbarang: '3',
      total: 24000,
    },
    {
      id: 8,
      tanggal: '2022-10-19',
      deskripsi: 'Keju',
      nota: 'Ada',
      harga: '30000',
      banyakbarang: '2',
      total: 60000,
    },
    {
      id: 9,
      tanggal: '2022-10-19',
      deskripsi: 'Ayam',
      nota: 'Ada',
      harga: '50000',
      banyakbarang: '1',
      total: 50000,
    },
    {
      id: 10,
      tanggal: '2022-10-20',
      deskripsi: 'Sayur',
      nota: 'Ada',
      harga: '10000',
      banyakbarang: '6',
      total: 60000,
    },
    {
      id: 11,
      tanggal: '2022-10-20',
      deskripsi: 'Ikan',
      nota: 'Ada',
      harga: '35000',
      banyakbarang: '2',
      total: 70000,
    },
    {
      id: 12,
      tanggal: '2022-10-20',
      deskripsi: 'Teh',
      nota: 'Ada',
      harga: '5000',
      banyakbarang: '8',
      total: 40000,
    },
    {
      id: 13,
      tanggal: '2022-10-21',
      deskripsi: 'Kopi',
      nota: 'Ada',
      harga: '10000',
      banyakbarang: '4',
      total: 40000,
    },
    {
      id: 14,
      tanggal: '2022-10-21',
      deskripsi: 'Sambal',
      nota: 'Ada',
      harga: '5000',
      banyakbarang: '3',
      total: 15000,
    },
    {
      id: 15,
      tanggal: '2022-10-21',
      deskripsi: 'Sosis',
      nota: 'Ada',
      harga: '20000',
      banyakbarang: '2',
      total: 40000,
    },
    {
      id: 16,
      tanggal: '2022-10-22',
      deskripsi: 'Makanan Ringan',
      nota: 'Ada',
      harga: '7000',
      banyakbarang: '5',
      total: 35000,
    },
    {
      id: 17,
      tanggal: '2022-10-22',
      deskripsi: 'Minuman',
      nota: 'Ada',
      harga: '12000',
      banyakbarang: '3',
      total: 36000,
    },
    {
      id: 18,
      tanggal: '2022-10-22',
      deskripsi: 'Buah',
      nota: 'Ada',
      harga: '15000',
      banyakbarang: '4',
      total: 60000,
    },
    {
      id: 19,
      tanggal: '2022-10-23',
      deskripsi: 'Permen',
      nota: 'Ada',
      harga: '3000',
      banyakbarang: '10',
      total: 30000,
    },
    {
      id: 20,
      tanggal: '2022-10-23',
      deskripsi: 'Es Krim',
      nota: 'Ada',
      harga: '10000',
      banyakbarang: '2',
      total: 20000,
    },
    {
      id: 21,
      tanggal: '2022-10-23',
      deskripsi: 'Kue',
      nota: 'Ada',
      harga: '5000',
      banyakbarang: '6',
      total: 30000,
    },
    {
      id: 22,
      tanggal: '2022-10-24',
      deskripsi: 'Lauk Pauk',
      nota: 'Ada',
      harga: '25000',
      banyakbarang: '2',
      total: 50000,
    },
    {
      id: 23,
      tanggal: '2022-10-24',
      deskripsi: 'Nasi',
      nota: 'Ada',
      harga: '5000',
      banyakbarang: '8',
      total: 40000,
    },
    {
      id: 24,
      tanggal: '2022-10-24',
      deskripsi: 'Sayuran',
      nota: 'Ada',
      harga: '8000',
      banyakbarang: '4',
      total: 32000,
    },
    {
      id: 25,
      tanggal: '2022-10-25',
      deskripsi: 'Daging',
      nota: 'Ada',
      harga: '30000',
      banyakbarang: '3',
      total: 90000,
    },
    {
      id: 26,
      tanggal: '2022-10-25',
      deskripsi: 'Telur Asin',
      nota: 'Ada',
      harga: '10000',
      banyakbarang: '5',
      total: 50000,
    },
    {
      id: 27,
      tanggal: '2022-10-25',
      deskripsi: 'Susu Kental',
      nota: 'Ada',
      harga: '12000',
      banyakbarang: '4',
      total: 48000,
    },
    {
      id: 28,
      tanggal: '2022-10-26',
      deskripsi: 'Roti Tawar',
      nota: 'Ada',
      harga: '5000',
      banyakbarang: '10',
      total: 50000,
    },
    {
      id: 29,
      tanggal: '2022-10-26',
      deskripsi: 'Keju Mozarella',
      nota: 'Ada',
      harga: '35000',
      banyakbarang: '2',
      total: 70000,
    },
    {
      id: 30,
      tanggal: '2022-10-26',
      deskripsi: 'Sosis Ayam',
      nota: 'Ada',
      harga: '15000',
      banyakbarang: '3',
      total: 45000,
    },
  ]
  useEffect(() => {
    if (items.length > 0) {
      const dates = items.map(item => new Date(item.tanggal));
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      setFilterDateRange({ start: minDate.toISOString().split('T')[0], end: maxDate.toISOString().split('T')[0] });
    }
  }, []);

  useEffect(() => {
    const filtered = items.filter(item => {
      const date = new Date(item.tanggal);
      const startDate = new Date(filterDateRange.start);
      const endDate = new Date(filterDateRange.end);
      return date >= startDate && date <= endDate && item.deskripsi.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(filtered);
  }, [filterDateRange, searchText]);

  const totalJumlah = filteredData.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('id-ID');

  return (
    <CCard className="p-4 shadow-sm" sm={6}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4>Uang Keluar</h4>
        <CButton color="danger" onClick={() => setModalVisible(true)}>
          Tambah Pengeluaran
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
          data={items}
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
        <CModalHeader closeButton>Tambah Pengeluaran</CModalHeader>
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
            <label htmlFor="nota" style={{fontSize: '14px'}}>Nota:</label>
            <CFormInput id="nota" type="text" placeholder="Masukkan Nota" />
          </div>
          <div className="mb-3">
            <label htmlFor="harga" style={{fontSize: '14px'}}>Harga:</label>
            <CFormInput id="harga" type="number" placeholder="Masukkan Harga" />
          </div>
          <div className="mb-3">
            <label htmlFor="banyakbarang" style={{fontSize: '14px'}}>Banyak Barang:</label>
            <CFormInput id="banyakbarang" type="number" placeholder="Masukkan Banyak Barang" />
          </div>
          <div className="mb-3">
            <label htmlFor="total" style={{fontSize: '14px'}}>Total:</label>
            <CFormInput id="total" type="number" placeholder="Masukkan Total" />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setModalVisible(false)}>Simpan</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Pengeluaran
