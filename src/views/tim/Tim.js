import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'

const Tim = () => {
  const columns = [
    {
      key: 'id',
      label: 'No',
      _props: { scope: 'col' },
    },
    {
      key: 'nama',
      label: 'Nama Kegiatan',
      _props: { scope: 'col' },
    },
    {
      key: 'jabatan',
      label: 'Jabatan',
      _props: { scope: 'col' },
    },
    {
      key: 'email',
      label: 'Email',
      _props: { scope: 'col' },
    },
    {
      key: 'ponsel',
      label: 'No HP',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      nama: 'Doni',
      jabatan: 'Ketua Tim',
      email: 'acron@gmail.com',
      ponsel: '085161240041',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      nama: 'Krisna',
      jabatan: 'Anggota',
      email: 'kmbrps@gmail.com',
      ponsel: '082282240041',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      nama: 'Imam',
      jabatan: 'Anggotaa',
      email: 'imamakbar@gmail.com',
      ponsel: '085182240041',
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <CCard className="p-4" sm={6}>
      <h4>Anggota Tim</h4>
      <CTable columns={columns} items={items} />
    </CCard>
  )
}

export default Tim
