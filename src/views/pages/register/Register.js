import React, { useState } from 'react'
import { CFormSelect } from '@coreui/react'
import Select from 'react-select'
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
import { cilUser, cilCalendar, cilUserFemale, cilBriefcase, cilGroup, cilShortText, cilLocationPin, cilPhone, cilEnvelopeClosed, cilStar } from '@coreui/icons'

const Register = () => {
  const [formData, setFormData] = useState({
    nama: '',
    ttl: '',
    gender: '',
    pendidikan_terakhir: '',
    pekerjaan: '',
    ktp: '',
    alamat: '',
    telp: '',
    email: '',
    kecakapan: [],
  });

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

  const handleSubmit = () => {
    // Implement submit logic here
    console.log(formData);
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
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CRow>
                    <CCol md={6}>
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
                    </CCol>
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
                          name="telp"
                          placeholder="Telepon"
                          onChange={handleChange}
                        />
                      </CInputGroup>
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
                          <CIcon icon={cilStar} />
                        </CInputGroupText>
                        <Select
                          isMulti
                          name="kecakapan"
                          options={kecakapanOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleMultiSelectChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

