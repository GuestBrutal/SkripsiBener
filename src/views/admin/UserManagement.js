import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CForm } from '@coreui/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
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

  const handleEdit = (user) => {
    setEditUser({ ...user });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const url = `http://localhost:8080/user/${editUser.id}`;
    try {
      const response = await axios.put(url, editUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        fetchUsers();
        setShowModal(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

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
          <CButton size="sm" color="info" onClick={() => handleEdit(row)}>
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
        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader closeButton>
            Edit User
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CFormInput type="text" name="nama" value={editUser?.nama} onChange={handleChange} placeholder="Nama" />
              <CFormInput type="text" name="username" value={editUser?.username} onChange={handleChange} placeholder="Username" />
              <CFormInput type="email" name="email" value={editUser?.email} onChange={handleChange} placeholder="Email" />
              <CFormInput type="text" name="no_handphone" value={editUser?.no_handphone} onChange={handleChange} placeholder="No. Telepon" />
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

export default UserManagement;
