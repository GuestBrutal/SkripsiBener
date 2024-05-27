import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CRow, CCol, CCard, CFormInput, CInputGroup, CInputGroupText, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormLabel, CFormSelect } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilPencil, cilTrash, cilCheck, cilX } from '@coreui/icons'

const DaftarKegiatan = () => {
  const url = 'http://localhost:8080/daftar_kegiatan';
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalValidasi, setModalValidasi] = useState(false);
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
  const [kegiatanValidasi, setKegiatanValidasi] = useState(null);
  const [pendaftar, setPendaftar] = useState({
    tervalidasi: [],
    belumTervalidasi: [
      { id: 1, nama: 'John Doe', jabatan: 'Anggota' },
      { id: 2, nama: 'Jane Doe', jabatan: 'Anggota' }
    ]
  });

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
        fetchData();
        setModalTambah(false);
        setKegiatanBaru({
          nama_kegiatan: '',
          deskripsi: '',
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
      const response = await axios.put(`${url}/${kegiatanEdit.no}`, kegiatanEdit, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        fetchData();
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
        const updatedData = data.filter(item => item.no !== id);
        setData(updatedData);
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleValidasi = (kegiatan) => {
    setKegiatanValidasi(kegiatan);
    setModalValidasi(true);
  };

  const validatePendaftar = (id) => {
    const updatedBelumTervalidasi = pendaftar.belumTervalidasi.filter(item => item.id !== id);
    const validated = pendaftar.belumTervalidasi.find(item => item.id === id);
    setPendaftar({
      tervalidasi: [...pendaftar.tervalidasi, validated],
      belumTervalidasi: updatedBelumTervalidasi
    });
  };

  const rejectPendaftar = (id) => {
    const updatedBelumTervalidasi = pendaftar.belumTervalidasi.filter(item => item.id !== id);
    setPendaftar({
      ...pendaftar,
      belumTervalidasi: updatedBelumTervalidasi
    });
  };

  const handleChange = (e) => {
    setKegiatanEdit({ ...kegiatanEdit, [e.target.id]: e.target.value });
    setKegiatanBaru({ ...kegiatanBaru, [e.target.id]: e.target.value });
  };

  const columns = [
    {
      name: 'No',
      selector: row => filteredData.indexOf(row) + 1,
      sortable: true,
      width: '8%'
    },
    {
      name: 'Nama',
      selector: row => row.nama_kegiatan,
      sortable: true
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi,
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
      format: row => `Rp. ${row.rab.toLocaleString('id-ID')}`
    },
    {
      name: 'Mulai',
      selector: row => new Date(row.tgl_mulai).toLocaleDateString('id-ID'),
      sortable: true,
      width: '10%'
    },
    {
      name: 'Selesai',
      selector: row => new Date(row.tgl_selesai).toLocaleDateString('id-ID'),
      sortable: true,
      width: '12%'
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
          <CButton size="sm" color="info" className='text-light' onClick={() => handleEdit(row)}>
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton size="sm" color="danger" className='ms-2 text-white' onClick={() => handleHapus(row.no)}>
            <CIcon icon={cilTrash} />
          </CButton>
          <CButton size="sm" color="primary" className='ms-2 text-white' onClick={() => handleValidasi(row)}>
            <CIcon icon={cilCheck} />
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

            <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
            <CFormInput type="text" id="deskripsi" placeholder="Masukkan deskripsi kegiatan" required value={kegiatanBaru.deskripsi} onChange={handleChange} />

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

            <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
            <CFormInput type="text" id="deskripsi" placeholder="Masukkan deskripsi kegiatan" required value={kegiatanEdit?.deskripsi} onChange={handleChange} />

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
      <CModal visible={modalValidasi} onClose={() => setModalValidasi(false)}>
        <CModalHeader closeButton>Validasi Pendaftar</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
            <CFormInput type="text" id="deskripsi" placeholder="Deskripsi Kegiatan" required value={kegiatanValidasi?.deskripsi} readOnly />

            <CFormLabel htmlFor="lokasi">Lokasi</CFormLabel>
            <CFormInput type="text" id="lokasi" placeholder="Lokasi Kegiatan" required value={kegiatanValidasi?.lokasi} readOnly />

            <h5 className="mt-4">Pendaftar Tervalidasi</h5>
            <table className='table table-striped table-bordered'>
              <thead className='text-center'>
                <tr>
                  <th>Nama</th>
                  <th>Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {pendaftar.tervalidasi.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center">Belum ada relawan</td>
                  </tr>
                ) : (
                  pendaftar.tervalidasi.map(p => (
                    <tr key={p.id}>
                      <td>{p.nama}</td>
                      <td>{p.jabatan}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <ul>

            </ul>

            <h5 className="mt-4">Pendaftar Belum Tervalidasi</h5>
            <table className='table table-striped table-bordered'>
              <thead className='text-center'>
                <tr>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendaftar.belumTervalidasi.map(p => (
                    <tr key={p.id}>
                      <td>{p.nama}</td>
                      <td>
                        <CButton size="sm" color="success" className='ms-2' onClick={() => validatePendaftar(p.id)}>
                          <CIcon icon={cilCheck} />
                        </CButton>
                        <CButton size="sm" color="danger" className='ms-2' onClick={() => rejectPendaftar(p.id)}>
                          <CIcon icon={cilX} />
                        </CButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalValidasi(false)}>Tutup</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default DaftarKegiatan

