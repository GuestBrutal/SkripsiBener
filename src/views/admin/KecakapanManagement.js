import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CForm, CBadge, CFormSelect, CFormLabel } from '@coreui/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons';

const KecakapanManagement = () => {
  const [kecakapan, setKecakapan] = useState([]);
  const [editKecakapan, setEditKecakapan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchKecakapan();
  }, []);

  const fetchKecakapan = async () => {
    const url = 'http://localhost:8080/kecakapan';
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setKecakapan(response.data);
      } else {
        console.error('Failed to fetch kecakapan');
      }
    } catch (error) {
      console.error('Error fetching kecakapan:', error);
    }
  };

  const handleEdit = (kecakapan) => {
    setEditKecakapan({ ...kecakapan });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const url = `http://localhost:8080/kecakapan/${editKecakapan.id}`;
    try {
      const response = await axios.put(url, editKecakapan, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setKecakapan(kecakapan.map(k => k.id === editKecakapan.id ? editKecakapan : k));
        setShowModal(false);
      } else {
        console.error('Failed to update kecakapan');
      }
    } catch (error) {
      console.error('Error updating kecakapan:', error);
    }
  };

  const handleDelete = async (id) => {
    const url = `http://localhost:8080/kecakapan/${id}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setKecakapan(kecakapan.filter(k => k.id !== id));
      } else {
        console.error('Failed to delete kecakapan');
      }
    } catch (error) {
      console.error('Error deleting kecakapan:', error);
    }
  };

  const handleChange = (e) => {
    setEditKecakapan({ ...editKecakapan, [e.target.name]: e.target.value });
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '5%'
    },
    {
      name: 'Nama Kecakapan',
      selector: row => row.nama,
      sortable: true,
      width: '25%'
    },
    {
      name: 'Warna Label',
      selector: row => {
        let color = row.warna;
        return <CBadge style={{width: '50px'}} color={color}>{row.nama}</CBadge>;
      },
      sortable: true,
      width: '25%'
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <>
          <CButton size="sm" color="info" onClick={() => handleEdit(row)}>
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton size="sm" color="danger" className="m-2" onClick={() => handleDelete(row.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '20%'
    }
  ];

  return (
    <CCard>
      <CCardHeader className='d-flex justify-content-between align-items-center'>
        <h5>Manajemen Kecakapan</h5>
        <CButton color="primary" onClick={() => {}}>
          <CIcon icon={cilPlus} className="text-white" />
        </CButton>
      </CCardHeader>
      <CCardBody>
        <DataTable
          data={kecakapan}
          columns={columns}
          noHeader
          dense
          highlightOnHover
          striped
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
        />
        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader closeButton>
            <div className="d-flex justify-content-between align-items-center">
              Edit Kecakapan
            </div>
          </CModalHeader>
          <CModalBody>
            <CForm className="px-3 py-2">
              <CFormLabel htmlFor="nama">Nama Kecakapan</CFormLabel>
              <CFormInput
                type="text"
                id="nama"
                name="nama"
                value={editKecakapan?.nama}
                onChange={handleChange}
                placeholder="Masukkan Nama Kecakapan"
                className="mb-3"
              />
              <CFormLabel htmlFor="warna">Warna Label</CFormLabel>
              <CFormSelect
                id="warna"
                name="warna"
                value={editKecakapan?.warna}
                onChange={handleChange}
                className="mb-3"
              >
                <option value="">Pilih Warna Label</option>
                <option value="primary">Biru</option>
                <option value="secondary">Abu-Abu</option>
                <option value="success">Hijau</option>
                <option value="danger">Merah</option>
                <option value="warning">Kuning</option>
                <option value="info">Biru Muda</option>
                <option value="light">Putih</option>
                <option value="dark">Hitam</option>
              </CFormSelect>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={handleUpdate}>Update</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default KecakapanManagement;
