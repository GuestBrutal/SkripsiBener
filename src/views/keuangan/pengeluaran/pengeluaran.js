import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CButton, CCardHeader, CCardBody, CTable } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'

const Pengeluaran = () => {
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
      key: 'nota',
      label: 'nota',
      _props: { scope: 'col' },
    },
    {
      key: 'harga',
      label: 'Harga',
      _props: { scope: 'col' },
    },
    {
      key: 'banyakbarang',
      label: 'Jumlah (Barang)',
      _props: { scope: 'col' },
    },
    {
      key: 'total',
      label: 'Total',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      tanggal: '17-10-2022',
      deskripsi: 'Beras',
      nota: 'Ada',
      harga: '17000',
      banyakbarang: '10',
      total: 170000,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      tanggal: '17-10-2022',
      deskripsi: 'Minyak',
      nota: 'Ada',
      harga: '20000',
      banyakbarang: '2',
      total: 400000,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      tanggal: '17-10-2022',
      deskripsi: 'Mie',
      nota: 'Ada',
      harga: '150000',
      banyakbarang: '3',
      total: 450000,
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <CCard className="p-4" sm={6}>
      <center>
        <h4>Uang Keluar</h4>
      </center>
      <br />
      <CButton className="col-5 mx-auto" color="danger">
        Tambah Pengeluaran
      </CButton>
      <br />
      <CTable columns={columns} items={items} />
    </CCard>
  )
}

export default Pengeluaran
