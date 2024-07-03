import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CButton, CBadge, CFormInput } from '@coreui/react';
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash, cilPlus, cilArrowCircleLeft, cilX } from '@coreui/icons';
import axios from 'axios';

const DaftarTarget = ({target,setTarget}) => {
  const [namaTugasBaru, setNamaTugasBaru] = useState('');
  const [kategoriId, setKategoriId] = useState(null);
  const [showInput, setShowInput] = useState(false);


  const deleteTugas = async (tugas) => {
    const url = `https://smrapiii.000webhostapp.com/daftar_tugas/${tugas.id_tugas}`;
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      setTarget(prevTarget => prevTarget.map(t => t.no === tugas.target_id ? { ...t, tugas: t.tugas.filter(tgs => tgs.id_tugas !== tugas.id_tugas) } : t));
    } else {
      console.error('Tugas gagal dihapus');
    }
  }

  const tambahTugas = async (kategori) => {
    const url = `https://smrapiii.000webhostapp.com/daftar_tugas/`;
    const response = await axios.post(url, {
      target_id: kategoriId,
      nama_tugas: namaTugasBaru,
      status: 'Belum Terlaksana'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 201) {
      const tugas = {
        no: kategoriId,
        nama_tugas: response.data.data.nama_tugas,
        target_id: response.data.data.target_id,
        status: response.data.data.status,
        nama_target: kategori.nama_target,
        target_selesai: kategori.target_selesai,
        progress: kategori.progress,
        target_mulai: kategori.target_mulai,
        kegiatan_id: kategori.kegiatan_id,
        id_tugas: response.data.data.id_tugas
      };
      setShowInput(false);
      setNamaTugasBaru('');
      setTarget(prevTarget => prevTarget.map(t => t.no === kategoriId ? { ...t, tugas: [...t.tugas, tugas] } : t));
    } else {
      console.error('Tugas gagal ditambahkan');
    }
  }

  const columns = [
    { name: 'No', selector: (row, index) => index + 1, sortable: true },
    { name: 'Nama Tugas', selector: row => row.nama_tugas, sortable: true },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => <CBadge color={row.status === 'Terlaksana' ? 'success' : row.status === 'Belum Terlaksana' ? 'warning' : 'danger'}>{row.status}</CBadge>
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <>
          <CButton color="danger" size="sm" className='text-white' onClick={() => deleteTugas(row)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
      ignoreRowClick: true,
    }
  ];

  return (
    <div>
      {target.map((kategori, index) => (
        <CCard key={index} className='mb-3'>
          <CCardHeader className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <span className='fw-bold me-2 fs-5'>{kategori.nama_target}</span>
              <span className='text-muted fw-bold' style={{ fontSize: '0.85 rem' }}>{new Date(kategori.target_mulai).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(kategori.target_selesai).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
            </div>
            <div className='d-flex'>
              {showInput && kategoriId == kategori.no && (
                <>
                  <CFormInput
                    type="text"
                    placeholder="Nama Tugas Baru"
                    value={namaTugasBaru}
                    onChange={(e) => setNamaTugasBaru(e.target.value)}
                    className='me-2'
                  />
                  <CButton color="primary" size="sm" onClick={()=>tambahTugas(kategori)} className='me-2'>
                    Tambah
                  </CButton>
                </>
              )}
              <CButton color={showInput ? 'secondary' : 'success'} size="sm" onClick={() => { setShowInput(!showInput); setKategoriId(kategori.no); }}>
                <CIcon icon={showInput ? cilX : cilPlus} />
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={kategori.tugas}
              highlightOnHover
              striped
              pagination
            />
          </CCardBody>
        </CCard>
      ))}
    </div>
  );
};

export default DaftarTarget;

