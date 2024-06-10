import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CInputGroup, CInputGroupText, CAlert } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash } from '@coreui/icons'
import axios from 'axios';

const Pemasukan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [kegiatan, setKegiatan] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/'+localStorage.getItem('UID'), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setKegiatan(response.data.kegiatan_id);
        const pemasukan = await axios.get('http://localhost:8080/pemasukan/'+response.data.kegiatan_id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(pemasukan.data);
        setData(pemasukan.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Tanggal',
      selector: row => row.tanggal,
      sortable: true,
      format: row => new Date(row.tanggal).toLocaleDateString('id-ID',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi,
      sortable: true,
    },
    {
      name: 'Sumber Dana',
      selector: row => row.sumber_dana,
      sortable: true,
    },
    {
      name: 'Jumlah',
      selector: row => parseInt(row.jumlah).toLocaleString('id-ID',{
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 3,
      }),
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <>
          <CButton className='mx-1' color="info" size="sm" onClick={() => handleEdit(row)}>
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton color="danger" size="sm" onClick={() => handleDelete(row.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
      ignoreRowClick: true,
    },
  ]

  useEffect(() => {
    if (data.length > 0) {
      const dates = data.map(item => {
        return new Date(item.tanggal);
      });
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date();
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

  const totalJumlah = filteredData.reduce((acc, curr) => parseInt(acc) + parseInt(curr.jumlah), 0).toLocaleString('id-ID',{
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });

  const handleAddPemasukan = async (tanggal, deskripsi, sumberdana, jumlah) => {
    console.log(tanggal, deskripsi, sumberdana, jumlah);
    try {
      const newEntry = {
        tanggal : tanggal,
        deskripsi : deskripsi,
        sumber_dana: sumberdana,
        jumlah: parseInt(jumlah),
        id_kegiatan: parseInt(kegiatan),
      };
      const response = await axios.post('http://localhost:8080/pemasukan', newEntry, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setData([...data, newEntry]);
      setModalVisible(false);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error adding pemasukan: ', error);
      setErrorMessage(error.response.data.messages);
    }
  };

  const handleEdit = (row) => {
    setSelectedData(row);
    setModalEditVisible(true);
  };

  const handleUpdatePemasukan = async (no, tanggal, deskripsi, sumberdana, jumlah, id_kegiatan) => {
    try {
      const updatedEntry = {
        no : no,
        tanggal: tanggal,
        deskripsi: deskripsi,
        sumber_dana: sumberdana,
        jumlah: parseInt(jumlah),
        id_kegiatan : id_kegiatan
      };
      console.log(updatedEntry);
      const response = await axios.put(`http://localhost:8080/pemasukan/${selectedData.no}`, updatedEntry, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const updatedData = data.map(item => item.no === selectedData.no ? { ...item, ...updatedEntry } : item);
      setData(updatedData);
      setModalEditVisible(false);
      setErrorMessage(null);
    } catch (error) {
      // console.error('Error updating pemasukan: ', error.response.data.messages);
      setErrorMessage(error.response.data.messages);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pemasukan/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const newData = data.filter(item => item.id !== id);
      setData(newData);
    } catch (error) {
      console.error('Error deleting pemasukan: ', error);
    }
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
          <strong>Total: {totalJumlah}</strong>
        </div>
      </CCardBody>
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader closeButton>Tambah Pemasukan</CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <label htmlFor="tanggal" style={{fontSize: '14px'}}>Tanggal:</label>
            <CFormInput id="tanggal" type="date" placeholder="Masukkan Tanggal" />
          </div>
          {errorMessage?.tanggal && <CAlert color="danger" size="sm">{errorMessage.tanggal}</CAlert>}
          <div className="mb-3">
            <label htmlFor="deskripsi" style={{fontSize: '14px'}}>Deskripsi:</label>
            <CFormInput id="deskripsi" type="text" placeholder="Masukkan Deskripsi" />
          </div>
          {errorMessage?.deskripsi && <CAlert color="danger" size="sm">{errorMessage.deskripsi}</CAlert>}
          <div className="mb-3">
            <label htmlFor="sumberdana" style={{fontSize: '14px'}}>Sumber Dana:</label>
            <CFormInput id="sumberdana" type="text" placeholder="Masukkan Sumber Dana" />
          </div>
          {errorMessage?.sumber_dana && <CAlert color="danger" size="sm">{errorMessage.sumber_dana}</CAlert>}
          <div className="mb-3">
            <label htmlFor="jumlah" style={{fontSize: '14px'}}>Jumlah:</label>
            <CFormInput id="jumlah" type="number" placeholder="Masukkan Jumlah" />
          </div>
          {errorMessage?.jumlah && <CAlert color="danger" size="sm">{errorMessage.jumlah}</CAlert>}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => handleAddPemasukan(document.getElementById('tanggal').value, document.getElementById('deskripsi').value, document.getElementById('sumberdana').value, document.getElementById('jumlah').value)}>Simpan</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={modalEditVisible} onClose={() => setModalEditVisible(false)}>
        <CModalHeader closeButton>Edit Pemasukan</CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <label htmlFor="editTanggal" style={{fontSize: '14px'}}>Tanggal:</label>
            <CFormInput id="editTanggal" type="date" defaultValue={selectedData ? new Date(selectedData.tanggal).toISOString().split('T')[0] : ''} />
          </div>
          {errorMessage?.tanggal && <CAlert color="danger" size="sm">{errorMessage.tanggal}</CAlert>}
          <div className="mb-3">
            <label htmlFor="editDeskripsi" style={{fontSize: '14px'}}>Deskripsi:</label>
            <CFormInput id="editDeskripsi" type="text" defaultValue={selectedData ? selectedData.deskripsi : ''} />
          </div>
          {errorMessage?.deskripsi && <CAlert color="danger" size="sm">{errorMessage.deskripsi}</CAlert>}
          <div className="mb-3">
            <label htmlFor="editSumberdana" style={{fontSize: '14px'}}>Sumber Dana:</label>
            <CFormInput id="editSumberdana" type="text" defaultValue={selectedData ? selectedData.sumber_dana : ''} />
          </div>
          {errorMessage?.sumber_dana && <CAlert color="danger" size="sm">{errorMessage.sumber_dana}</CAlert>}
          <div className="mb-3">
            <label htmlFor="editJumlah" style={{fontSize: '14px'}}>Jumlah:</label>
            <CFormInput id="editJumlah" type="number" min={0} defaultValue={selectedData ? selectedData.jumlah : ''} />
          </div>
          {errorMessage?.jumlah && <CAlert color="danger" size="sm">{errorMessage.jumlah}</CAlert>}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => {
            handleUpdatePemasukan(
              selectedData.no,
              document.getElementById('editTanggal').value,
              document.getElementById('editDeskripsi').value,
              document.getElementById('editSumberdana').value,
              document.getElementById('editJumlah').value,
              selectedData.id_kegiatan
            );
          }}>Simpan Perubahan</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Pemasukan
