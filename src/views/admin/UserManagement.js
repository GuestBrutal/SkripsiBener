import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API or use static data
    async function fetchUsers() {
      const url = 'http://localhost:8080/user';
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
          console.log(response);
          setUsers(response.data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '5%'
    },
    {
      name: 'Nama',
      selector: row => row.nama,
      sortable: true,
      width: '20%'
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
      width: '20%'
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: '20%'
    },
    {
      name: 'No. Telepon',
      selector: row => row.no_handphone,
      sortable: true,
      width: '20%'
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <>
          <CButton size="sm" color="info">
            Edit
          </CButton>
          <CButton size="sm" color="danger" className="m-2">
            Hapus
          </CButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '15%'
    }
  ];

  return (
    <CCard>
      <CCardHeader>
        Manajemen Pengguna
      </CCardHeader>
      <CCardBody>
        <DataTable
          data={users}
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
    </CCard>
  );
};

export default UserManagement;
