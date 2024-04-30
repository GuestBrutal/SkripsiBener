import React, { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import DataTable from 'react-data-table-component';
import { DocsLink } from 'src/components'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const Target = () => {
  const [filterText, setFilterText] = useState('');
  const columns = [
    { name: 'No', selector: row => row.id, sortable: true, center: true },
    { name: 'Nama Kegiatan', selector: row => row.nama, sortable: true, center: true },
    { name: 'Target Selesai', selector: row => row.target, sortable: true, center: true },
    { name: 'Progress', selector: row => row.progress, sortable: true, center: true, cell: row => renderCircularProgressBar(row.progress) },
    { name: 'Sisa Waktu', selector: row => row.tempo, sortable: true, center: true },
  ]
  const data = [
    {
      id: 1,
      nama: 'PELAKSANAAN',
      target: '18-11-2022',
      progress: 25,
      tempo: '3 Hari',
    },
    {
      id: 2,
      nama: 'PEKERJAAN PERSIAPAN',
      target: '19-10-2022',
      progress: 50,
      tempo: '3 Hari',
    },
    {
      id: 3,
      nama: 'PRA KEGIATAN',
      target: '17-10-2022',
      progress: 75,
      tempo: '3 Hari',
    },
  ]

  const filteredItems = data.filter(item => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()));

  const renderCircularProgressBar = (progress) => {
    return (
      <div style={{ width: '50px', height: '50px' }}>
        <CircularProgressbar value={progress} text={`${progress}%`} />
      </div>
    );
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
    </CCard>
  )
}

export default Target
