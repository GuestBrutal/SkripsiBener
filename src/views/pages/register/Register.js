import React, { useState } from 'react'
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
import { cilUser, cilLockLocked, cilCalendar, cilUserFemale, cilBriefcase, cilIdCard, cilLocationPin, cilPhone, cilEnvelopeClosed, cilStar, cilSchool, cilBuilding, cilClock, cilWarning, cilGroup, cilCreditCard, cilShortText } from '@coreui/icons'

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
    kecakapan: '',
    pelatihan: '',
    penyelenggara: '',
    tempat: '',
    tahun: '',
    bencana: '',
    lokasi: '',
    waktu: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Implement submit logic here
    console.log(formData);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
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
                  {/* Add other form inputs for registration data */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
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
                      <CIcon icon={cilCalendar} /> {/* Tambahkan icon kalender di sini */}
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
                    <CFormInput
                      type="text"
                      name="gender"
                      placeholder="Jenis Kelamin"
                      onChange={handleChange}
                    />
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
                    <CFormInput
                      type="text"
                      name="kecakapan"
                      placeholder="Kecakapan"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilSchool} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="pelatihan"
                      placeholder="Pelatihan"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="penyelenggara"
                      placeholder="Penyelenggara"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="tempat"
                      placeholder="Tempat"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="tahun"
                      placeholder="Tahun"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilWarning} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="bencana"
                      placeholder="Bencana"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="lokasi"
                      placeholder="Lokasi"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilClock} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="waktu"
                      placeholder="Waktu"
                      onChange={handleChange}
                    />
                  </CInputGroup>
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
