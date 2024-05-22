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
  const [modalNotaVisible, setModalNotaVisible] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([
    {
      id: 1,
      tanggal: '2022-10-17',
      deskripsi: 'Beli alat tulis',
      nota: 'Nota123.jpg',
      harga: 50000,
      banyakbarang: 10,
      total: 500000,
    },
    {
      id: 2,
      tanggal: '2022-10-18',
      deskripsi: 'Beli meja',
      nota: null,
      harga: 150000,
      banyakbarang: 5,
      total: 750000,
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
      format: row => new Date(row.tanggal).toLocaleDateString('id-ID'),
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi,
      sortable: true,
      center: true,
    },
    {
      name: 'Nota',
      selector: row => row.nota ? <CButton size="sm" color="success" onClick={() => { setSelectedNota(row.nota); setModalNotaVisible(true); }}>Ada</CButton> : <CButton size="sm" color="secondary" disabled>Tidak Ada</CButton>,
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

  useEffect(() => {
    if (items.length > 0) {
      const dates = items.map(item => new Date(item.tanggal));
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      setFilterDateRange({ start: minDate.toISOString().split('T')[0], end: maxDate.toISOString().split('T')[0] });
    }
  }, [items]);

  useEffect(() => {
    const filtered = items.filter(item => {
      const date = new Date(item.tanggal);
      const startDate = new Date(filterDateRange.start);
      const endDate = new Date(filterDateRange.end);
      return date >= startDate && date <= endDate && item.deskripsi.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(filtered);
  }, [filterDateRange, searchText, items]);

  const totalJumlah = filteredData.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('id-ID');

  const handleAddPengeluaran = (event) => {
    event.preventDefault();
    const harga = parseInt(event.target.harga.value);
    const banyakbarang = parseInt(event.target.banyakbarang.value);
    const total = harga * banyakbarang;
    const newPengeluaran = {
      id: items.length + 1,
      tanggal: event.target.tanggal.value,
      deskripsi: event.target.deskripsi.value,
      nota: event.target.nota.files[0] ? URL.createObjectURL(event.target.nota.files[0]) : null,
      harga: harga,
      banyakbarang: banyakbarang,
      total: total,
    };
    setItems([...items, newPengeluaran]);
    setModalVisible(false);
  };

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
        <CModalHeader closeButton>Tambah Pengeluaran</CModalHeader>
        <CModalBody>
          <form onSubmit={handleAddPengeluaran}>
            <div className="mb-3">
              <label htmlFor="tanggal">Tanggal:</label>
              <CFormInput id="tanggal" type="date" required />
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi">Deskripsi:</label>
              <CFormInput id="deskripsi" type="text" required />
            </div>
            <div className="mb-3">
              <label htmlFor="nota">Nota (Opsional):</label>
              <CFormInput id="nota" type="file" accept="image/*" />
            </div>
            <div className="mb-3">
              <label htmlFor="harga">Harga:</label>
              <CFormInput id="harga" type="number" required onChange={e => {
                const updatedTotal = parseInt(e.target.value) * parseInt(document.getElementById('banyakbarang').value || 0);
                document.getElementById('total').value = isNaN(updatedTotal) ? '' : updatedTotal;
              }} />
            </div>
            <div className="mb-3">
              <label htmlFor="banyakbarang">Banyak Barang:</label>
              <CFormInput id="banyakbarang" type="number" required onChange={e => {
                const updatedTotal = parseInt(e.target.value) * parseInt(document.getElementById('harga').value || 0);
                document.getElementById('total').value = isNaN(updatedTotal) ? '' : updatedTotal;
              }} />
            </div>
            <div className="mb-3">
              <label htmlFor="total">Total:</label>
              <CFormInput id="total" type="number" required readOnly />
            </div>
            <CButton type="submit" color="danger">Simpan</CButton>
          </form>
        </CModalBody>
      </CModal>
      <CModal visible={modalNotaVisible} onClose={() => setModalNotaVisible(false)}>
        <CModalHeader closeButton>Lihat Nota</CModalHeader>
        <CModalBody>
          {selectedNota ? <img src={selectedNota} alt="Nota" style={{ width: '100%' }} /> : <p>Nota tidak tersedia.</p>}
        </CModalBody>
      </CModal>
    </CCard>
  )
}

export default Pengeluaran

