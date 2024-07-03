import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CFormSelect, CButton } from '@coreui/react';
import axios from 'axios';
import provinsiData from '../../assets/Wilayah/provinsi.json';

const Setting = () => {
  const [userProfile, setUserProfile] = useState({
    kegiatan: "",
    nama: "",
    ktp: "",
    ttlStringify: "",
    ttl: "",
    alamat: "",
    telp: "",
    pendidikan_terakhir: "",
    pekerjaan: "",
    email: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: ""
  });

  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kabupatenOptions, setKabupatenOptions] = useState([]);
  const [kecamatanOptions, setKecamatanOptions] = useState([]);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const userId = localStorage.getItem('UID');
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`http://smrapi.my.id//user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const address = data.alamat.split(';');
        const prov_id = provinsiData.data.find(item => item.name === address[3])?.code || "";
        setProvinsiOptions([{ value: '', label: 'Pilih Provinsi' }, ...provinsiData.data.map(item => ({ value: item.code, label: item.name }))]);

        const { data: kabData } = await axios.get(`https://api.cahyadsn.com/regencies/${prov_id}`);
        setKabupatenOptions(kabData.data.map(item => ({ value: item.kode, label: item.nama })));

        const kab_id = kabData.data.find(item => item.nama === address[2])?.kode || "";
        const { data: kecData } = await axios.get(`https://api.cahyadsn.com/districts/${kab_id}`);
        setKecamatanOptions(kecData.data.map(item => ({ value: item.kode, label: item.nama })));

        const kec_id = kecData.data.find(item => item.nama === address[1])?.kode || "";

        setUserProfile({
          kegiatan: data.kegiatan_id ? data.kegiatan[0].nama_kegiatan : "Belum Ada Kegiatan Aktif",
          nama: data.nama,
          ktp: data.ktp,
          ttl: data.ttl,
          ttlStringify: new Date(data.ttl).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: '2-digit' }),
          alamat: address[0],
          telp: data.telp,
          pendidikan_terakhir: data.pendidikan_terakhir,
          pekerjaan: data.pekerjaan,
          email: data.email,
          provinsi: prov_id,
          kabupaten: kab_id,
          kecamatan: kec_id
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSelectChange = async (e, type) => {
    const selectedValue = e.target.value;
    setUserProfile(prevState => ({ ...prevState, [type]: selectedValue, ...(type === 'provinsi' && { kabupaten: "", kecamatan: "" }), ...(type === 'kabupaten' && { kecamatan: "" }) }));

    if (type === 'provinsi') {
      try {
        const { data } = await axios.get(`https://api.cahyadsn.com/regencies/${selectedValue}`);
        setKabupatenOptions(data.data.map(item => ({ value: item.kode, label: item.nama })));
      } catch (error) {
        console.error('Error fetching kabupaten options:', error);
      }
    } else if (type === 'kabupaten') {
      try {
        const { data } = await axios.get(`https://api.cahyadsn.com/districts/${selectedValue}`);
        setKecamatanOptions(data.data.map(item => ({ value: item.kode, label: item.nama })));
      } catch (error) {
        console.error('Error fetching kecamatan options:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserProfile(prevState => ({ ...prevState, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswords(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // Handle password update logic here
  };

  return (
    <>
      <CCard style={{ border: 'none' }}>
        <CCardHeader>
          <h3>Informasi Login</h3>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmitPassword}>
            <CRow className="mb-3">
              <CCol md="3">
                <CFormLabel htmlFor="email"><strong>Email</strong></CFormLabel>
              </CCol>
              <CCol md="9">
                <CFormInput
                  type="email"
                  id="email"
                  value={userProfile.email}
                  readOnly
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="3">
                <CFormLabel htmlFor="oldPassword"><strong>Password Lama</strong></CFormLabel>
              </CCol>
              <CCol md="9">
                <CFormInput
                  type="password"
                  id="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="3">
                <CFormLabel htmlFor="newPassword"><strong>Password Baru</strong></CFormLabel>
              </CCol>
              <CCol md="9">
                <CFormInput
                  type="password"
                  id="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="3">
                <CFormLabel htmlFor="confirmPassword"><strong>Konfirmasi Password Baru</strong></CFormLabel>
              </CCol>
              <CCol md="9">
                <CFormInput
                  type="password"
                  id="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </CCol>
            </CRow>
            <CButton type="submit" color="primary">Ubah Password</CButton>
          </CForm>
        </CCardBody>
      </CCard>

<CCard style={{ border: 'none', marginTop: '20px' }}>
  <CCardHeader>
    <h3>Informasi Umum</h3>
  </CCardHeader>
  <CCardBody>
    <CForm onSubmit={handleSubmitProfile}>
      {[
        { label: "Kegiatan Aktif", id: "kegiatan", value: userProfile.kegiatan, readOnly: true },
        { label: "Nama", id: "nama", value: userProfile.nama, readOnly: true },
        { label: "KTP", id: "ktp", value: userProfile.ktp, readOnly: true },
        { label: "Tanggal Lahir", id: "ttl", value: userProfile.ttl.split('T')[0], readOnly: true, type: "date" },
        { label: "Pendidikan Terakhir", id: "pendidikan_terakhir", value: userProfile.pendidikan_terakhir, type: "select" },
        { label: "Pekerjaan", id: "pekerjaan", value: userProfile.pekerjaan },
        { label: "Telepon", id: "telp", value: userProfile.telp },
        { label: "Alamat", id: "alamat", value: userProfile.alamat, type: "textarea", rows: 3 }
      ].map(({ label, id, value, readOnly = false, type = "text", ...rest }) => (
        <CRow className="mb-3" key={id}>
          <CCol md="3">
            <CFormLabel htmlFor={id}><strong>{label}</strong></CFormLabel>
          </CCol>
          <CCol md="9">
            {type === "textarea" ? (
              <CFormTextarea
                id={id}
                value={value}
                onChange={handleInputChange}
                readOnly={readOnly}
                style={readOnly ? { backgroundColor: '#e9ecef' } : {}}
                {...rest}
              />
            ) : type === "select" ? (
              <CFormSelect
                id={id}
                value={value}
                onChange={handleInputChange}
                readOnly={readOnly}
                style={readOnly ? { backgroundColor: '#e9ecef' } : {}}
                {...rest}
              >
                <option value="">Pilih Pendidikan Terakhir</option>
                <option value="Sekolah Dasar">Sekolah Dasar (SD)</option>
                <option value="Sekolah Menengah Pertama">Sekolah Menengah Pertama (SMP)</option>
                <option value="Sekolah Menengah Atas">Sekolah Menengah Atas (SMA)</option>
                <option value="Diploma">Diploma</option>
                <option value="Sarjana">Sarjana</option>
              </CFormSelect>
            ) : (
              <CFormInput
                type={type}
                id={id}
                value={value}
                onChange={handleInputChange}
                readOnly={readOnly}
                style={readOnly ? { backgroundColor: '#e9ecef' } : {}}
                {...rest}
              />
            )}
          </CCol>
        </CRow>
      ))}
      <CRow className="mb-3">
        <CCol md="3">
          <CFormLabel htmlFor="provinsi"><strong>Provinsi</strong></CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="provinsi" value={userProfile.provinsi} onChange={(e) => handleSelectChange(e, 'provinsi')}>
            <option value="">Pilih Provinsi</option>
            {provinsiOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md="3">
          <CFormLabel htmlFor="kabupaten"><strong>Kabupaten/Kota</strong></CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="kabupaten" value={userProfile.kabupaten} onChange={(e) => handleSelectChange(e, 'kabupaten')} disabled={!userProfile.provinsi}>
            <option value="">Pilih Kabupaten/Kota</option>
            {kabupatenOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md="3">
          <CFormLabel htmlFor="kecamatan"><strong>Kecamatan</strong></CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="kecamatan" value={userProfile.kecamatan} onChange={(e) => handleSelectChange(e, 'kecamatan')} disabled={!userProfile.kabupaten}>
            <option value="">Pilih Kecamatan</option>
            {kecamatanOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CButton type="submit" color="primary">Simpan Perubahan</CButton>
    </CForm>
  </CCardBody>
</CCard>
    </>
  );
};

export default Setting;
