import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CFormInput, CInputGroup, CInputGroupText, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CBadge } from '@coreui/react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DataTable from 'react-data-table-component';
import { DocsLink } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilList } from '@coreui/icons'
import axios from 'axios';

const Target = () => {
  const [filterText, setFilterText] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/target/' + localStorage.getItem('kegiatan_id'), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: 'No', selector: row => data.indexOf(row) + 1, sortable: true,},
    { name: 'Nama Kegiatan', selector: row => row.nama_target, sortable: true,},
    { name: 'Tanggal Mulai', selector: row => row.target_mulai, sortable: true,},
    { name: 'Target Selesai', selector: row => row.target_selesai, sortable: true,},
    {
      name: 'Progress',
      selector: row => {
        const total = row.tugas.length > 0 ? row.tugas.length : 0;
        const done = row.tugas.filter(t => t.status === "Terlaksana").length > 0 ? row.tugas.filter(t => t.status === "Terlaksana").length : 0;
        return total > 0 ? (done / total) * 100 : 0;
      },
      sortable: true,
      cell: row => {
        const total = row.tugas.length > 0 ? row.tugas.length : 0;
        const done = row.tugas.filter(t => t.status === "Terlaksana").length > 0 ? row.tugas.filter(t => t.status === "Terlaksana").length : 0;
        return renderCircularProgressBar(total > 0 ? (done / total) * 100 : 0);
      }
    },
    {
      name: 'Tugas',
      button: true,
      cell: (row) => (
        <CButton color="primary" onClick={() => handleShowTasks(row.tugas)}>
          <CIcon icon={cilList} />
        </CButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  const filteredItems = data.filter(item => item.nama_target && item.nama_target.toLowerCase().includes(filterText.toLowerCase()));

  const renderCircularProgressBar = (progress) => {
    return (
      <div style={{ width: '50px', height: '50px' }}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
      </div>
    );
  }

  const handleShowTasks = (tasks) => {
    setSelectedTasks(tasks);
    setModalVisible(true);
  }

  return (
    <CCard className="p-4" sm={6}>
      <h4>Target</h4>
      <div className="d-flex justify-content-end">
        <CInputGroup className="w-25">
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            type="text"
            placeholder="Cari Nama Kegiatan..."
            onChange={e => setFilterText(e.target.value)}
          />
        </CInputGroup>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
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
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader closeButton>
          <h5>Daftar Tugas</h5>
        </CModalHeader>
        <CModalBody>
          <DataTable
            columns={[
              {
                name: 'Nama Tugas',
                selector: row => row.nama_tugas,
                sortable: true,
              },
              {
                name: 'Status',
                selector: row => <CBadge color={row.status === 'Terlaksana' ? 'success' : (row.status === 'Belum Terlaksana' ? 'warning' : 'danger')}>{row.status}</CBadge>,
                sortable: true,
              }
            ]}
            data={selectedTasks}
            noHeader
            dense
            striped
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Tutup</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default Target
