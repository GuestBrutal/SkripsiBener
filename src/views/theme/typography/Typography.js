import React from 'react'
import { CCard, CTable, CCardHeader, CCardBody } from '@coreui/react'
import { DocsLink } from 'src/components'

const Typography = () => {
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
      key: 'lokasi',
      label: 'Lokasi',
      _props: { scope: 'col' },
    },
    {
      key: 'anggaran',
      label: 'RAB',
      _props: { scope: 'col' },
    },
    {
      key: 'mulai',
      label: 'Tanggal Mulai',
      _props: { scope: 'col' },
    },
    {
      key: 'selesai',
      label: 'Tanggal Selesai',
      _props: { scope: 'col' },
    },
    {
      key: 'progress',
      label: 'Progress',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      nama: 'Penanganan Bencana Banjir',
      lokasi: 'Bandar Lampung',
      anggaran: '125000000',
      mulai: '17-10-2022',
      selesai: '18-11-2022',
      progress: 25,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      nama: 'Penanganan Bencana Banjir',
      lokasi: 'Bandar Lampung',
      anggaran: '125000000',
      mulai: '17-10-2022',
      selesai: '18-11-2022',
      progress: 25,
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      nama: 'Penanganan Bencana Banjir',
      lokasi: 'Bandar Lampung',
      anggaran: '125000000',
      mulai: '17-10-2022',
      selesai: '18-11-2022',
      progress: 25,
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <CCard className="p-4" sm={6}>
      <h4>Daftar Kegiatan</h4>
      <CTable columns={columns} items={items} />
    </CCard>
  )
}

export default Typography
