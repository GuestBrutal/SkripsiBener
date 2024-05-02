import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import DataTable from 'react-data-table-component';

const Tim = () => {
  const columns = [
    {
      name: 'No',
      selector: row => row.id,
      sortable: true,
      compact: true,
      width: '10%', // Menetapkan lebar kolom
    },
    {
      name: 'Nama Kegiatan',
      selector: row => row.nama,
      sortable: true,
      compact: true,
      width: '25%', // Menetapkan lebar kolom
    },
    {
      name: 'Jabatan',
      selector: row => row.jabatan,
      sortable: true,
      compact: true,
      width: '20%', // Menetapkan lebar kolom
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      compact: true,
      width: '20%', // Menetapkan lebar kolom
    },
    {
      name: 'No HP',
      selector: row => row.ponsel,
      sortable: true,
      compact: true,
      width: '25%', // Menetapkan lebar kolom
      cell: row => (
        <>
          {row.ponsel}
          <CButton
            color="success"
            href={`https://wa.me/62${row.ponsel.substring(1)}`}
            target="_blank"
            style={{ marginLeft: '10px', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
          >
            Hubungi
          </CButton>
        </>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      nama: 'Doni',
      jabatan: 'Ketua Tim',
      email: 'acron@gmail.com',
      ponsel: '085161240041',
    },
    {
      id: 2,
      nama: 'Krisna',
      jabatan: 'Anggota',
      email: 'kmbrps@gmail.com',
      ponsel: '082282240041',
    },
    {
      id: 3,
      nama: 'Imam',
      jabatan: 'Anggotaa',
      email: 'imamakbar@gmail.com',
      ponsel: '085182240041',
    },
  ];

  return (
    <CCard className="p-4" sm={6}>
      <h4>Anggota Tim</h4>
      <DataTable columns={columns} data={data} pagination dense />
    </CCard>
  )
}

export default Tim
