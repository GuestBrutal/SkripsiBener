import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CRow, CCol, CCard, CFormInput, CInputGroup, CInputGroupText, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormLabel, CFormSelect, CFormTextarea, CModalTitle } from '@coreui/react'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus, cilPencil, cilTrash, cilCheck, cilX,cilList, cilUser } from '@coreui/icons'
import Select from 'react-select';
import provinsiData from '../../assets/Wilayah/provinsi.json';
import DaftarTarget from './DaftarTarget';
import DaftarKoordinator from './DaftarKoordinator';


const DaftarKegiatan = () => {
  const url = 'http://smrapi.my.id//daftar_kegiatan';
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalTambah, setModalTambah] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalValidasi, setModalValidasi] = useState(false);
  const [visibleTarget, setVisibleTarget] = useState(false);
  const [visibleKoordinator, setVisibleKoordinator] = useState(false);
  const [data, setData] = useState([]);
  const [target, setTarget] = useState([]);
  const [kegiatanBaru, setKegiatanBaru] = useState({
    nama_kegiatan: '',
    lokasi: '',
    rab: 0,
    tgl_mulai: '',
    tgl_selesai: '',
    status: ''
  });
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [pendaftar, setPendaftar] = useState([]);
  const [relawan, setRelawan] = useState([]);
  const [ketuaDropdown, setKetuaDropdown] = useState([]);
  const [provinsiOptions, setProvinsiOptions] = useState([]);

  useEffect(() => {
    fetchData();
    setProvinsiOptions(provinsiData.data.map(provinsi => ({ value: provinsi.name, label: provinsi.name })));
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setData(response.data);
        const Pendaftar = response.data.map(item => ({
          id_kegiatan: item.no,
          user: item.user
        }));
        setPendaftar(Pendaftar);
        setFilteredData(response.data.filter(item => item.nama_kegiatan.toLowerCase().includes(searchText.toLowerCase())));
        const valid =  await axios.get('http://smrapi.my.id//user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        });
        if (valid.status === 200) {
          const groupedRelawan = valid.data.filter(item => item.kegiatan_id !== null).reduce((acc, item) => {
            if (!acc[item.kegiatan_id]) {
              acc[item.kegiatan_id] = [];
            }
            acc[item.kegiatan_id].push(item);
            return acc;
          }, {});

          const Relawan = Object.keys(groupedRelawan).map(id_kegiatan => ({
            id_kegiatan: parseInt(id_kegiatan),
            user: groupedRelawan[id_kegiatan].sort((a, b) => b.role === 'Ketua' ? 1 : -1)
          }));

          const allUser = valid.data;
          setRelawan(Relawan);
          setKetuaDropdown(allUser.filter(user => user.kegiatan_id === null && user.role === '-').map(user => ({ value: user.id, label: user.nama })));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setFilteredData(data.filter(item => item.nama_kegiatan.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText, data]);

  const handleTambahKegiatan = async () => {
    try {
      const response = await axios.post(url, kegiatanBaru, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 201) {
        fetchData();
        setModalTambah(false);
        setKegiatanBaru({
          nama_kegiatan: '',
          deskripsi: '',
          lokasi: '',
          rab: 0,
          tgl_mulai: '',
          tgl_selesai: '',
          status: '',
          ketua:'',
        });
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const handleEdit = (kegiatan) => {
    const ketuaModel = relawan.filter(item => item.id_kegiatan == kegiatan.no)[0]?.user.filter(item => item.role === 'Ketua')[0];
    const ketua = { value: ketuaModel?.id??'', label: ketuaModel?.nama??'' };
    setSelectedKegiatan({ ...kegiatan, ketua: ketua.value });
    if(!ketuaDropdown.find(item => item.value === ketua.value)) {
      setKetuaDropdown([ketua,...ketuaDropdown]);
    }
    setModalEdit(true);
  };

  const handleUpdateKegiatan = async () => {
    try {
      const response = await axios.put(`${url}/${selectedKegiatan.no}`, selectedKegiatan, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        fetchData();
        setModalEdit(false);
      }
    } catch (error) {
      console.error('Error updating activity: ', error);
    }
  };

  const handleHapus = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        const updatedData = data.filter(item => item.no !== id);
        setData(updatedData);
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleValidasi = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setModalValidasi(true);
  };
  const handleTarget = (kegiatan) => {
    setTarget(kegiatan.target);
    setVisibleTarget(true);
    // navigate(`/admin/daftarTarget`, { state: {target: kegiatan.target} });
  };

  const handleKoordinator = (kegiatan) => {
    // setKoordinator(kegiatan.koordinator);
    setSelectedKegiatan(kegiatan);
    setVisibleKoordinator(true);
    // navigate(`/admin/daftarKoordinator`);
  };

  const validatePendaftar = async (aksi,id_kegiatan,id_user) => {
    try {
      const response = await axios.put(`${url}/validasi/${aksi}`, {
        id_kegiatan : id_kegiatan,
        id_user : id_user
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error('Error validating registrant:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'rab' && e.target.value < 0) {
      e.target.value *= -1;
    }
    setSelectedKegiatan({ ...selectedKegiatan, [e.target.id]: e.target.value });
    setKegiatanBaru({ ...kegiatanBaru, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setKegiatanBaru({ ...kegiatanBaru, ketua: selectedOption.value });
    setSelectedKegiatan({ ...selectedKegiatan, ketua: selectedOption.value });
  };

  const columns = [
    {
      name: 'No',
      selector: row => filteredData.indexOf(row) + 1,
      sortable: true,
      width: '8%'
    },
    {
      name: 'Nama',
      selector: row => row.nama_kegiatan,
      sortable: true
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi,
      sortable: true
    },
    {
      name: 'Lokasi',
      selector: row => row.lokasi,
      sortable: true
    },
    {
      name: 'Anggaran',
      selector: row => row.rab,
      sortable: true,
      format: row => parseInt(row.rab).toLocaleString('id-ID',{
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 3,
      })
    },
    {
      name: 'Mulai',
      selector: row => new Date(row.tgl_mulai).toLocaleDateString('id-ID'),
      sortable: true,
      width: '10%'
    },
    {
      name: 'Selesai',
      selector: row => new Date(row.tgl_selesai).toLocaleDateString('id-ID'),
      sortable: true,
      width: '12%'
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => <CBadge color={row.status === 'Selesai' ? 'success' : row.status === 'Dalam Proses' ? 'warning' : 'danger'}>{row.status}</CBadge>
    },
    {
      name: 'Detail',
      cell: row => (
        <>
          <CButton size="sm" color="info" className='ms-2 text-white' onClick={() => handleTarget(row)}>
            <CIcon icon={cilList} />
          </CButton>
          <CButton size="sm" color="warning" className='ms-2 text-white' onClick={() => handleKoordinator(row)}>
            <CIcon icon={cilUser} />
          </CButton>
        </>
      ),
      ignoreRowClick: true,
    },
    {
      name: 'Aksi',
      cell: row => (
        <>
          <CButton size="sm" color="info" className='text-light' onClick={() => handleEdit(row)}>
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton size="sm" color="danger" className='ms-2 text-white' onClick={() => handleHapus(row.no)}>
            <CIcon icon={cilTrash} />
          </CButton>
          <CButton size="sm" color="success" className='ms-2 text-white' onClick={() => handleValidasi(row)}>
            <CIcon icon={cilCheck} />
          </CButton>
        </>
      ),
      ignoreRowClick: true,
    }
  ];

  return (
    <CCard className="p-4 m-3" sm={6}>
      <CRow className='justify-content-between pb-3'>
        <CCol sm={8} className='w-50'>
          <h4>Daftar Kegiatan</h4>
        </CCol>
        <CRow className='w-50 justify-content-end'>
          <CCol sm={12} className='w-75'>
            <CInputGroup>
              <CFormInput
                type="text"
                placeholder="Cari Nama Kegiatan..."
                onChange={e => setSearchText(e.target.value)}
              />
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>
            </CInputGroup>
          </CCol>
          <CCol sm={12} className='w-25'>
            <CButton color="success" onClick={() => setModalTambah(true)}>
              <CIcon icon={cilPlus} />
            </CButton>
          </CCol>
        </CRow>
      </CRow>
      <DataTable
        columns={columns}
        data={filteredData}
        customStyles={{
          headCells: {
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
            },
          },
          cells: {
            style: {
              textAlign: 'center',
              padding: '10px',
            },
          },
        }}
        pagination
      />
      <CModal visible={modalTambah} onClose={() => setModalTambah(false)}>
        <CModalHeader closeButton>Tambah Kegiatan Baru</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="nama">Nama Kegiatan</CFormLabel>
            <CFormInput type="text" id="nama_kegiatan" placeholder="Masukkan nama kegiatan" required value={kegiatanBaru.nama_kegiatan} onChange={handleChange} />

            <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
            <CFormInput type="text" id="deskripsi" placeholder="Masukkan deskripsi kegiatan" required value={kegiatanBaru.deskripsi} onChange={handleChange} />

            <CFormLabel htmlFor="lokasi"> Lokasi </CFormLabel>
            <Select
              id="lokasi"
              options={provinsiData.data.map(provinsi => ({ value: provinsi.name, label: provinsi.name }))}
              onChange={selectedOption => setKegiatanBaru({ ...kegiatanBaru, lokasi: selectedOption.value })}
              isSearchable={true}
              placeholder="Pilih Lokasi"
            />

            <CFormLabel htmlFor="anggaran">Anggaran</CFormLabel>
            <CFormInput type="number" id="rab" placeholder="Masukkan anggaran kegiatan" min={0} required value={kegiatanBaru.rab} onChange={handleChange} />

            <CFormLabel htmlFor="mulai">Tanggal Mulai</CFormLabel>
            <CFormInput type="date" id="tgl_mulai" required value={kegiatanBaru.tgl_mulai} onChange={handleChange} />

            <CFormLabel htmlFor="selesai">Tanggal Selesai</CFormLabel>
            <CFormInput type="date" id="tgl_selesai" required value={kegiatanBaru.tgl_selesai} onChange={handleChange} min={kegiatanBaru?.tgl_mulai ? new Date(new Date(kegiatanBaru.tgl_mulai).getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} />

            <CFormLabel htmlFor="ketua">Ketua Tim</CFormLabel>
              <Select
                id="ketua"
                options={ketuaDropdown}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder="Pilih Ketua Tim"
              />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleTambahKegiatan}>Simpan</CButton>
          <CButton color="secondary" onClick={() => setModalTambah(false)}>Batal</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={modalEdit} onClose={() => setModalEdit(false)}>
        <CModalHeader closeButton>Edit Kegiatan</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="nama">Nama Kegiatan</CFormLabel>
            <CFormInput type="text" id="nama_kegiatan" placeholder="Masukkan nama kegiatan" required value={selectedKegiatan?.nama_kegiatan} onChange={handleChange} />

            <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
            <CFormInput type="text" id="deskripsi" placeholder="Masukkan deskripsi kegiatan" required value={selectedKegiatan?.deskripsi} onChange={handleChange} />

            <CFormLabel htmlFor="lokasi"> Lokasi </CFormLabel>
            <Select
              id="lokasi"
              options={provinsiOptions}
              onChange={selectedOption => setSelectedKegiatan({ ...selectedKegiatan, lokasi: selectedOption.value })}
              isSearchable={true}
              placeholder="Pilih Lokasi"
              defaultValue={provinsiOptions.find(option => option.value === selectedKegiatan?.lokasi)}
            />

            <CFormLabel htmlFor="anggaran">Anggaran</CFormLabel>
            <CFormInput type="number" id="rab" placeholder="Masukkan anggaran kegiatan" min={0} required value={selectedKegiatan?.rab} onChange={handleChange} />

            <CFormLabel htmlFor="mulai">Tanggal Mulai</CFormLabel>
            <CFormInput type="date" id="tgl_mulai" required value={selectedKegiatan?.tgl_mulai} onChange={handleChange} />

            <CFormLabel htmlFor="selesai">Tanggal Selesai</CFormLabel>
            <CFormInput type="date" id="tgl_selesai" required value={selectedKegiatan?.tgl_selesai} onChange={handleChange} />

            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect id="status" required value={selectedKegiatan?.status} onChange={handleChange}>
              <option value="">Pilih status kegiatan</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </CFormSelect>

            <CFormLabel htmlFor="ketua">Ketua Tim</CFormLabel>
              <Select
                id="ketua"
                options={ketuaDropdown}
                onChange={handleSelectChange}
                isSearchable={true}
                placeholder="Pilih Ketua Tim"
                defaultValue={ketuaDropdown[0]}
              />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleUpdateKegiatan}>Update</CButton>
          <CButton color="secondary" onClick={() => setModalEdit(false)}>Batal</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={modalValidasi} onClose={() => setModalValidasi(false)}>
        <CModalHeader closeButton>Validasi Pendaftar</CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
            <CFormTextarea id="deskripsi" placeholder="Deskripsi Kegiatan" required value={selectedKegiatan?.deskripsi} readOnly />
            <CFormLabel htmlFor="lokasi">Lokasi</CFormLabel>
            <CFormInput type="text" id="lokasi" placeholder="Lokasi Kegiatan" required value={selectedKegiatan?.lokasi} readOnly />
            <h5 className="mt-4">Pendaftar Tervalidasi</h5>
            <table className='table table-striped table-bordered'>
              <thead className='text-center'>
                <tr>
                  <th>Nama</th>
                  <th>Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {selectedKegiatan && relawan.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center">Belum ada relawan</td>
                  </tr>
                ) : (
                  selectedKegiatan && relawan.find(item => item.id_kegiatan == selectedKegiatan?.no)?.user.map(p => (
                    <tr key={p.id}>
                      <td>
                        {p.nama}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '2px'}}>
                          {p.kecakapan ? p.kecakapan.map(skill => (
                            <CBadge color={skill.warna} key={skill.id}>
                              {skill.nama}
                            </CBadge>
                          )) : null}
                        </div>
                      </td>
                      <td>
                        {p.role}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <ul>

            </ul>

            <h5 className="mt-4">Pendaftar Belum Tervalidasi</h5>
            <table className='table table-striped table-bordered'>
              <thead className='text-center'>
                <tr>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedKegiatan && pendaftar.find(item => item.id_kegiatan == selectedKegiatan?.no)?.user.map(p => (
                    <tr key={p.id}>
                    <td>
                      {p.nama}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '2px'}}>
                        {p.kecakapan ? p.kecakapan.map(skill => (
                          <CBadge color={skill.warna} key={skill.id}>
                            {skill.nama}
                          </CBadge>
                        )) : null}
                      </div>
                    </td>
                      <td>
                        <CButton size="sm" color="success" className='ms-2' onClick={() => validatePendaftar('accept',selectedKegiatan?.no,p.id)}>
                          <CIcon icon={cilCheck} />
                        </CButton>
                        <CButton size="sm" color="danger" className='ms-2' onClick={() => validatePendaftar('reject',selectedKegiatan?.no,p.id)}>
                          <CIcon icon={cilX} />
                        </CButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalValidasi(false)}>Tutup</CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={visibleTarget}
        onClose={() => {setVisibleTarget(false); setTarget([])}}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Daftar Target</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DaftarTarget target={target} setTarget={setTarget} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {setVisibleTarget(false); setTarget([])}}>
            Tutup
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={visibleKoordinator}
        onClose={() => {setVisibleKoordinator(false);}}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Koordinator Kecakapan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DaftarKoordinator props={selectedKegiatan}/>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => {setVisibleKoordinator(false)}}>
            Tutup
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default DaftarKegiatan




