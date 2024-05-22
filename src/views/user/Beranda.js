import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CButton, CImage, CCard, CCardHeader, CCardBody, CTable } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import relawan from 'src/assets/images/relawan.jpg'

const Beranda = () => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <CRow>
        <CCol sm={6}>
          <CCard className="p-4" sm={6} style={{ border: 'none' }}>
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
            <CButton className="d-grid gap-2 col-5 mx-left" color="warning" onClick={() => window.location.href = '/user/relawan'}>
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
          <CCard className="p-4" sm={6} style={{ border: 'none' }}>
            <CImage fluid src={relawan} />
            <CImage fluid src={relawan} />
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Beranda
