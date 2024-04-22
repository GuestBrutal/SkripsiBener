import React from 'react'
import { CCard, CTable, CCardHeader, CCardBody } from '@coreui/react'
import { DocsLink } from 'src/components'

const Target = () => {
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
      key: 'target',
      label: 'Target Selesai',
      _props: { scope: 'col' },
    },
    {
      key: 'progress',
      label: 'Progress',
      _props: { scope: 'col' },
    },
    {
      key: 'tempo',
      label: 'Sisa Waktu',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      nama: 'PELAKSANAAN',
      target: '18-11-2022',
      progress: 25,
      tempo: '3 Hari',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      nama: 'PEKERJAAN PERSIAPAN',
      target: '19-10-2022',
      progress: 25,
      tempo: '3 Hari',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      nama: 'PRA KEGIATAN',
      target: '17-10-2022',
      progress: 25,
      tempo: '3 Hari',
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <CCard className="p-4" sm={6}>
      <h4>Target</h4>
      <CTable columns={columns} items={items} />
    </CCard>
  )
}

export default Target
