import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable, CButton } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'

const Pemasukan = () => {
  const columns = [
    {
      key: 'id',
      label: 'No',
      _props: { scope: 'col' },
    },
    {
      key: 'tanggal',
      label: 'Tanggal',
      _props: { scope: 'col' },
    },
    {
      key: 'deskripsi',
      label: 'Deskripsi',
      _props: { scope: 'col' },
    },
    {
      key: 'sumberdana',
      label: 'Sumber Dana',
      _props: { scope: 'col' },
    },
    {
      key: 'jumlah',
      label: 'Jumlah',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      tanggal: '17-10-2022',
      deskripsi: 'Anggaran Relawan',
      sumberdana: 'RAB BNPB',
      jumlah: '5000000',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      tanggal: '17-10-2022',
      deskripsi: 'Donasi',
      sumberdana: 'KitaBisa.com',
      jumlah: '2000000',
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <CCard className="p-4" sm={6}>
      <center>
        <h4>Uang Masuk</h4>
      </center>
      <br />
      <CButton className="col-5 mx-auto" color="success">
        Tambah Pemasukan
      </CButton>
      <br />
      <CTable columns={columns} items={items} />
    </CCard>
  )
}

export default Pemasukan
