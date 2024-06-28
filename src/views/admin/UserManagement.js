import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CForm, CBadge, CCardFooter } from '@coreui/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [koordinator, setKoordinator] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchKoordinator();
  }, []);

  const fetchUsers = async () => {
    const url = 'http://localhost:8080/user';
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchKoordinator = async () => {
    const url = 'http://localhost:8080/koordinatorKecakapan';
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setKoordinator(response.data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const columns = [
    {
      name: 'No',
      selector: (row,index) => index + 1,
      sortable: true,
      width: '7%'
    },
    {
      name: 'Nama',
      selector: row => (
        <>
          {row.nama}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '2px'}}>
            {row.kecakapan ? row.kecakapan.map(skill => (
              <CBadge color={skill.warna} key={skill.id}>
                {skill.nama}
              </CBadge>
            )) : (row.nama_kecakapan ?
              <CBadge color={row.warna_label} key={row.id_kecakapan}>
                {row.nama_kecakapan}
              </CBadge> : null)}
          </div>
        </>
      ),
      sortable: true,
      width: '18%'
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: '15%'
    },
    {
      name: 'Tanggal Lahir',
      selector: row => new Date(row.ttl).toLocaleDateString('id-ID'),
      sortable: true,
      width: '15%'
    },
    {
      name: 'No. Telepon',
      selector: row => row.telp,
      sortable: true,
      width: '15%'
    },
    {
      name: 'Role *',
      selector: row => row.role ? row.role : 'Koordinator ' + row.nama_kecakapan,
      sortable: true,
      width: '15%'
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <>
          <CButton size="sm" color="danger" className="m-2">
            Hapus
          </CButton>
        </>
      ),
      ignoreRowClick: true,
      width: '15%'
    }
  ];

  return (
    <>
      <CCard className='mb-2'>
        <CCardHeader>
          Manajemen Pengguna
        </CCardHeader>
        <CCardBody>
          <DataTable
            data={[...users, ...koordinator]}
            columns={columns}
            noHeader
            dense
            highlightOnHover
            striped
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
          />
        </CCardBody>
        <CCardFooter>
          <span className='text-muted small'>*) Akun dengan role '-' berarti belum memiliki kegiatan</span>
        </CCardFooter>
      </CCard>


    </>
  );
};

export default UserManagement;
