import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CBadge } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Tim = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://smrapi.my.id//tim/' + localStorage.getItem('kegiatan_id'), {
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
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '10%',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Nama',
      selector: row => (
        <>
          {row.nama}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px'}} className="my-2">
            {row.kecakapan ? row.kecakapan.map(skill => (
              <CBadge color={skill.warna} key={skill.id}>
                {skill.nama}
              </CBadge>
            )) : (row.nama_kecakapan ?
              <CBadge color={row.warna_label} key={row.id_kecakapan}>
                {row.nama_kecakapan}
              </CBadge> : null)}
          </div>
        </>
      ),
      sortable: true,
      width: '25%', // Menetapkan lebar kolom
    },
    {
      name: 'Jabatan',
      selector: row => row.role ? row.role : 'Koordinator ' + row.nama_kecakapan,
      sortable: true,
      width: '20%', // Menetapkan lebar kolom
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: '20%', // Menetapkan lebar kolom
    },
    {
      name: 'No HP',
      selector: row => row.telp,
      sortable: true,
      width: '25%', // Menetapkan lebar kolom
      cell: row => (
        <>
          {row.telp}
          <CButton
            color="success"
            href={`https://wa.me/62${row.telp.substring(1)}`}
            target="_blank"
            className="mx-2 btn-sm ms-auto"
          >
            Hubungi
          </CButton>
        </>
      ),
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
