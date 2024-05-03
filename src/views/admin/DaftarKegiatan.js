import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CRow, CCol, CCard, CFormInput, CInputGroup, CInputGroupText, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormLabel, CFormSelect } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilPencil, cilTrash } from '@coreui/icons'

const DaftarKegiatan = () => {
  const url = 'http://localhost:8080/daftar_kegiatan';
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [data, setData] = useState([]);
  const [kegiatanBaru, setKegiatanBaru] = useState({
    nama_kegiatan: '',
    lokasi: '',
    rab: 0,
    tgl_mulai: '',
    tgl_selesai: '',
    status: ''
  });
  const [kegiatanEdit, setKegiatanEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setData(response.data);
        setFilteredData(response.data.filter(item => item.nama_kegiatan.toLowerCase().includes(searchText.toLowerCase())));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setFilteredData(data.filter(item => item.nama_kegiatan.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, data]);

  const handleTambahKegiatan = async () => {
    try {
      const response = await axios.post(url, kegiatanBaru, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 201) {
        setData([...data, response.data]);
        setModalTambah(false);
        setKegiatanBaru({
          nama_kegiatan: '',
          lokasi: '',
          rab: 0,
          tgl_mulai: '',
          tgl_selesai: '',
          status: ''
        });
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleEdit = (kegiatan) => {
    setKegiatanEdit(kegiatan);
    setModalEdit(true);
  };

  const handleUpdateKegiatan = async () => {
    try {
      const response = await axios.put(`${url}/${kegiatanEdit.id}`, kegiatanEdit, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        const updatedData = data.map(item => item.id === kegiatanEdit.id ? response.data : item);
        setData(updatedData);
        setModalEdit(false);
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleHapus = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleChange = (e) => {
    setKegiatanEdit({ ...kegiatanEdit, [e.target.id]: e.target.value });
    setKegiatanBaru({ ...kegiatanBaru, [e.target.id]: e.target.value });
  };

  const columns = [
    {
      name: 'Nama',
      selector: row => row.nama_kegiatan,
      sortable: true
    },
    {
      name: 'Lokasi',
      selector: row => row.lokasi,
      sortable: true
    },
    {
      name: 'Anggaran',
      selector: row => row.rab,
      sortable: true,
      right: true,
      format: row => `Rp. ${row.rab.toLocaleString()}`
    },
    {
      name: 'Tanggal Mulai',
      selector: row => row.tgl_mulai,
      sortable: true
    },
    {
      name: 'Tanggal Selesai',
      selector: row => row.tgl_selesai,
      sortable: true
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => <CBadge color={row.status === 'Selesai' ? 'success' : row.status === 'Dalam Proses' ? 'warning' : 'danger'}>{row.status}</CBadge>
    },
    {
      name: 'Aksi',
      cell: row => (
        <>
          <CButton size="sm" color="info" onClick={() => handleEdit(row)}>
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton size="sm" color="danger" onClick={() => handleHapus(row.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

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
            <CFormInput type="text" id="nama_kegiatan" placeholder="Masukkan nama kegiatan" required value={kegiatanBaru.nama_kegiatan} onChange={handleChange} />

            <CFormLabel htmlFor="lokasi"> Lokasi </CFormLabel>
            <CFormInput type="text" id="lokasi" placeholder="Masukkan lokasi kegiatan" required value={kegiatanBaru.lokasi} onChange={handleChange} />

            <CFormLabel htmlFor="anggaran">Anggaran</CFormLabel>
            <CFormInput type="number" id="rab" placeholder="Masukkan anggaran kegiatan" required value={kegiatanBaru.rab} onChange={handleChange} />

            <CFormLabel htmlFor="mulai">Tanggal Mulai</CFormLabel>
            <CFormInput type="date" id="tgl_mulai" required value={kegiatanBaru.tgl_mulai} onChange={handleChange} />

            <CFormLabel htmlFor="selesai">Tanggal Selesai</CFormLabel>
            <CFormInput type="date" id="tgl_selesai" required value={kegiatanBaru.tgl_selesai} onChange={handleChange} />

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
      <CModal visible={modalEdit} onClose={() => setModalEdit(false)}>
        <CModalHeader closeButton>Edit Kegiatan</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="nama">Nama Kegiatan</CFormLabel>
            <CFormInput type="text" id="nama_kegiatan" placeholder="Masukkan nama kegiatan" required value={kegiatanEdit?.nama_kegiatan} onChange={handleChange} />

            <CFormLabel htmlFor="lokasi"> Lokasi </CFormLabel>
            <CFormInput type="text" id="lokasi" placeholder="Masukkan lokasi kegiatan" required value={kegiatanEdit?.lokasi} onChange={handleChange} />

            <CFormLabel htmlFor="anggaran">Anggaran</CFormLabel>
            <CFormInput type="number" id="rab" placeholder="Masukkan anggaran kegiatan" required value={kegiatanEdit?.rab} onChange={handleChange} />

            <CFormLabel htmlFor="mulai">Tanggal Mulai</CFormLabel>
            <CFormInput type="date" id="tgl_mulai" required value={kegiatanEdit?.tgl_mulai} onChange={handleChange} />

            <CFormLabel htmlFor="selesai">Tanggal Selesai</CFormLabel>
            <CFormInput type="date" id="tgl_selesai" required value={kegiatanEdit?.tgl_selesai} onChange={handleChange} />

            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect id="status" required value={kegiatanEdit?.status} onChange={handleChange}>
              <option value="">Pilih status kegiatan</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleUpdateKegiatan}>Update</CButton>
          <CButton color="secondary" onClick={() => setModalEdit(false)}>Batal</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default DaftarKegiatan

