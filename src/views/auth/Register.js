import React, { useState, useEffect } from 'react'
import { CFormSelect } from '@coreui/react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilCalendar, cilUserFemale, cilBriefcase, cilGroup, cilShortText, cilLocationPin, cilPhone, cilEnvelopeClosed, cilStar, cilLockLocked } from '@coreui/icons'
import axios from 'axios';
import provinsiData from '../../assets/Wilayah/provinsi.json';

const Register = () => {
  const [formData, setFormData] = useState({
    ktp: '',
    nama: '',
    ttl: '',
    gender: '',
    pendidikan_terakhir: '',
    pekerjaan: '',
    alamat: '',
    provinsi: '',
    kabupaten_kota: '',
    kecamatan: '',
    no_handphone: '',
    kecakapan: [],
    email: '',
    password:'',
  });
  const [provinsiOptions, setProvinsiOptions] = useState([{ value: '', label: 'Pilih Provinsi' }]);
  const [kabupatenOptions, setKabupatenOptions] = useState([{ value: '', label: 'Pilih Kabupaten/Kota' }]);
  const [kecamatanOptions, setKecamatanOptions] = useState([{ value: '', label: 'Pilih Kecamatan' }]);
  const [step, setStep] = useState(1);

  const [provinsi, setProvinsi] = useState({kode : '', nama : ''});
  const [kabupaten, setKabupaten] = useState({kode : '', nama : ''});
  const [kecamatan, setKecamatan] = useState({kode : '', nama : ''});
  const [address, setAddress] = useState('');

  const [kecakapanOptions, setKecakapanOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const url = 'https://smrapi.my.id/kecakapan';
    const fetchKecakapanOptions = async () => {
      try {
        const response = await axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          setKecakapanOptions(response.data.map(item => ({ value: item.id, label: item.nama })));
        }
      } catch (error) {
        console.error('Gagal mengambil data kecakapan:', error);
        alert('Gagal mengambil data kecakapan. Silakan coba lagi.');
      }
    };
    try {
      const provinsi = provinsiData;
      setProvinsiOptions([{ value: '', label: 'Pilih Provinsi' }, ...provinsi.data.map(item => ({ value: item.code, label: item.name }))]);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      alert('Gagal mengambil data provinsi. Silakan coba lagi.');
    }
    fetchKecakapanOptions();
  }, []);

  const handleProvinsiChange = (selectedOption) => {
    const prov = {kode : selectedOption.target.value, nama : selectedOption.target[selectedOption.target.selectedIndex].label}
    setProvinsi(prov);
    setFormData({
      ...formData,
      provinsi: selectedOption.target.value,
      kabupaten_kota: '',
      kecamatan: '',
      alamat: ''
    });
    axios.get(`https://api.cahyadsn.com/regencies/${prov.kode}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        const kabupaten = response.data;
        setKabupatenOptions([{ value: '', label: 'Pilih Kabupaten/Kota' }, ...kabupaten.data.map(item => ({ value: item.kode, label: item.nama }))]);
      })
      .catch(error => {
        console.error('Error fetching regencies:', error);
        alert('Gagal mengambil data kabupaten/kota. Silakan coba lagi.');
      });
  };

  const handleKabupatenChange = (selectedOption) => {
    console.log(formData.provinsi);
    const kab = { kode: selectedOption.target.value, nama: selectedOption.target[selectedOption.target.selectedIndex].label }
    setKabupaten(kab);
    setFormData({
      ...formData,
      kabupaten_kota: selectedOption.target.value,
      kecamatan: '',
      alamat: ''
    });
    axios.get(`https://api.cahyadsn.com/districts/${kab.kode}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors'
    })
      .then(response => {
        const kecamatan = response.data;
        setKecamatanOptions([{ value: '', label: 'Pilih Kecamatan' }, ...kecamatan.data.map(item => ({ value: item.kode, label: item.nama }))]);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
        alert('Gagal mengambil data kecamatan. Silakan coba lagi.');
      });
  };

  const handleKecamatanChange = (selectedOption) => {
    const kec = {kode : selectedOption.target.value, nama : selectedOption.target[selectedOption.target.selectedIndex].label}
    setKecamatan(kec);
    setFormData({
      ...formData,
      kecamatan: selectedOption.target.value,
      alamat: `${address};${kec.nama};${kabupaten.nama};${provinsi.nama}`
    });
  };

  const handleAlamatChange = (e) => {
    const { name, value } = e.target;
    setAddress(value);
    setFormData({
      ...formData,
      alamat: `${value};${kecamatan.nama};${kabupaten.nama};${provinsi.nama}`
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    console.log(selectedOptions);
    setFormData({
      ...formData,
      kecakapan: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    console.log(formData.provinsi.value);
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://smrapi.my.id/user/';
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 201 || response.status === 200) {
        console.log(response);
        alert('Register Success');
        window.location.href = "/login";
      } else {
        setFormData({ ...formData, error: response.data.message || 'Register failed' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Gagal mendaftar. Silakan coba lagi.');
      setFormData({ ...formData, error: error});
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} lg={12} xl={12}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {step === 1 && (
                    <>
                      <CRow>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilShortText} />
                            </CInputGroupText>
                            <CFormInput
                              type="text"
                              name="ktp"
                              placeholder="Nomor KTP"
                              onChange={handleChange}
                              value={formData.ktp}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="nama"
                              placeholder="Nama"
                              autoComplete="nama"
                              onChange={handleChange}
                              value={formData.nama}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilCalendar} />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              name="ttl"
                              placeholder="Tanggal Lahir"
                              onChange={handleChange}
                              value={formData.ttl}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUserFemale} />
                            </CInputGroupText>
                            <CFormSelect
                              name="gender"
                              onChange={handleChange}
                              value={formData.gender}
                            >
                              <option value="">Pilih Jenis Kelamin</option>
                              <option value="pria">Pria</option>
                              <option value="wanita">Wanita</option>
                            </CFormSelect>
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilGroup} />
                            </CInputGroupText>
                            <CFormSelect
                              name="pendidikan_terakhir"
                              onChange={handleChange}
                              value={formData.pendidikan_terakhir}
                            >
                              <option value="">Pilih Pendidikan Terakhir</option>
                              <option value="Sekolah Dasar">Sekolah Dasar (SD)</option>
                              <option value="Sekolah Menengah Pertama">Sekolah Menengah Pertama (SMP)</option>
                              <option value="Sekolah Menengah Atas">Sekolah Menengah Atas (SMA)</option>
                              <option value="Diploma">Diploma</option>
                              <option value="Sarjana">Sarjana</option>
                            </CFormSelect>
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilBriefcase} />
                            </CInputGroupText>
                            <CFormInput
                              type="text"
                              name="pekerjaan"
                              placeholder="Pekerjaan"
                              onChange={handleChange}
                              value={formData.pekerjaan}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilPhone} />
                            </CInputGroupText>
                            <CFormInput
                              type="text"
                              name="no_handphone"
                              placeholder="Telepon"
                              onChange={handleChange}
                              value={formData.no_handphone}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <textarea
                              className='form-control'
                              name="alamat"
                              placeholder='Alamat Lengkap'
                              onChange={handleAlamatChange}
                              value={address}
                            ></textarea>
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormSelect
                              name="provinsi"
                              onChange={handleProvinsiChange}
                              value={formData.provinsi}
                              options={provinsiOptions}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormSelect
                              name="kabupaten_kota"
                              onChange={handleKabupatenChange}
                              value={formData.kabupaten_kota}
                              options={kabupatenOptions}
                              disabled={!provinsi.kode}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormSelect
                              name="kecamatan"
                              onChange={handleKecamatanChange}
                              value={formData.kecamatan}
                              options={kecamatanOptions}
                              disabled={!kabupaten.kode}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilStar} />
                            </CInputGroupText>
                            <Select
                              isMulti
                              name="kecakapan"
                              options={kecakapanOptions}
                              className="basic-multi-select form-control"
                              classNamePrefix="select"
                              placeholder="Pilih Kecakapan (bisa lebih dari 1)"
                              onChange={handleMultiSelectChange}
                              value={kecakapanOptions.filter(option => formData.kecakapan.includes(option.value))}
                            />
                          </CInputGroup>
                          <div className="d-flex justify-content-between">
                            <CButton color="secondary" onClick={()=> navigate('/login')}>Kembali</CButton>
                            <CButton color="primary" onClick={handleNext}>Selanjutnya</CButton>
                          </div>
                        </CCol>
                      </CRow>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <div className="d-flex justify-content-between">
                        <CButton color="secondary" onClick={handleBack}>Kembali</CButton>
                        <CButton color="success" type="submit">Daftar</CButton>
                      </div>
                    </>
                  )}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register

