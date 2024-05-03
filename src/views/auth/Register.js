import React, { useState } from 'react'
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

const Register = () => {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    ttl: '',
    gender: '',
    pendidikan_terakhir: '',
    pekerjaan: '',
    ktp: '',
    alamat: '',
    no_handphone: '',
    email: '',
    password:'',
    kecakapan: [],
  });
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      kecakapan: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/user/';
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
      setFormData({ ...formData, error: error});
    }
  };

  const kecakapanOptions = [
    { value: 'coding', label: 'Coding' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' }
  ];

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
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUserFemale} />
                            </CInputGroupText>
                            <CFormSelect
                              name="gender"
                              onChange={handleChange}
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
                            <CFormInput
                              type="text"
                              name="pendidikan_terakhir"
                              placeholder="Pendidikan Terakhir"
                              onChange={handleChange}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilBriefcase} />
                            </CInputGroupText>
                            <CFormInput
                              type="text"
                              name="pekerjaan"
                              placeholder="Pekerjaan"
                              onChange={handleChange}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                              type="text"
                              name="alamat"
                              placeholder="Alamat"
                              onChange={handleChange}
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
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Pilih Kecakapan"
                              onChange={handleMultiSelectChange}
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

