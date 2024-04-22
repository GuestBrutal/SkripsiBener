import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CButton, CImage, CCard, CCardHeader, CCardBody, CTable } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import relawan from 'src/assets/images/relawan.jpg'

const Beranda = () => {
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
      key: 'status',
      label: 'Status',
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
      status: 'Dalam Proses',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 2,
      nama: 'Penanganan Bencana Banjir',
      lokasi: 'Bandar Lampung',
      anggaran: '125000000',
      mulai: '17-10-2022',
      selesai: '18-11-2022',
      status: 'Selesai',
      _cellProps: { id: { scope: 'row' } },
    },
    {
      id: 3,
      nama: 'Penanganan Bencana Banjir',
      lokasi: 'Bandar Lampung',
      anggaran: '125000000',
      mulai: '17-10-2022',
      selesai: '18-11-2022',
      status: 'Tertunda',
      _cellProps: { id: { scope: 'row' } },
    },
  ]

  return (
    <CCard>
      <CRow>
        <CCol sm={6}>
          <CCard className="p-4" sm={6}>
            <h3>
              Mari Bergabung Menjadi
              <b> Relawan</b>
            </h3>
            <br />
            <p>
              Mari bersama membantu para korban bencana bersama kami.
              <br />
              Bergabung bersama tim Relawan dan BNPB Daerah setempat.
              <br />
              Daftarkan diri kamu sebagai Relawan!
            </p>
            <CButton className="d-grid gap-2 col-5 mx-left" color="warning">
              Daftar
            </CButton>
            <br />
            <p>
              <b>Apasih kegiatan Relawan itu?</b>
              <br />
              <br />
              Relawan merupakan bentuk keikutsertaan individu dalam kegiatan sosial yang didasari
              keinginan pribadi. Melalui kegiatan volunteer kamu akan mendapat koneksi baru dengan
              banyak orang, berbagi manfaat untuk lingkungan sosial dan punya dampak buat kesehatan
              mental juga lho.
              <br />
              <br />
              Eits meski organisasi dan magang sangat penting, volunteering juga penting lho. Kamu
              akan dipandang sebagai orang yang memiliki kepedulian sosial. Dengan berkontribusi
              langsung di masyarakat, kamu menjadi lebih peka dan sigap terhadap permasalahan.
            </p>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="p-4" sm={6}>
            <CImage fluid src={relawan} />
            <CImage fluid src={relawan} />
          </CCard>
        </CCol>
      </CRow>
    </CCard>
  )
}

export default Beranda
