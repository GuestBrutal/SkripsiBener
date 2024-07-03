import React from 'react';
import { CCard, CCardBody, CCardHeader, CCardImage, CListGroup, CListGroupItem } from '@coreui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Profile = () => {

  const [userProfile, setUserProfile] = useState({
    kegiatan: "",
    nama: "",
    ktp: "",
    ttl: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    telp: "",
    pendidikan_terakhir: "",
    pekerjaan: "",
    email: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem('UID');
    axios.get(`https://smrapi.my.id/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        const address = response.data.alamat.split(";");
        setUserProfile({
          kegiatan: response.data.kegiatan_id ? response.data.kegiatan[0].nama_kegiatan : "Belum Ada Kegiatan Aktif",
          nama: response.data.nama,
          ktp: response.data.ktp,
          ttl: new Date(response.data.ttl).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: '2-digit' }),
          alamat: address[0],
          provinsi: address[3],
          kabupaten: address[2],
          kecamatan: address[1],
          telp: response.data.telp,
          pendidikan_terakhir: response.data.pendidikan_terakhir,
          pekerjaan: response.data.pekerjaan,
          email: response.data.email,
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <>
      <CCard style={{ border: 'none' }}>
        <CCardHeader>
          <h3>Profil Pengguna</h3>
        </CCardHeader>
        <CCardBody>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none' }}>
            <tbody>
              {[
                { label: "Kegiatan Aktif", value: <strong>{userProfile.kegiatan}</strong> },
                { label: "Nama", value: userProfile.nama },
                { label: "KTP", value: userProfile.ktp },
                { label: "Tanggal Lahir", value: userProfile.ttl },
                { label: "Alamat", value: `${userProfile.alamat}, ${userProfile.kecamatan}` },
                { label: "", value: userProfile.kabupaten, className: 'ps-3',not: true },
                { label: "", value: userProfile.provinsi, className: 'ps-3',not: true },
                { label: "Telepon", value: userProfile.telp },
                { label: "Email", value: userProfile.email },
                { label: "Pekerjaan", value: userProfile.pekerjaan },
                { label: "Pendidikan Terakhir", value: userProfile.pendidikan_terakhir }
              ].map((item, index) => (
                <tr key={index}>
                  <td><strong>{item.label}</strong></td>
                  <td className={item.className || ''}>{item.not ? "" : ":"} {item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Profile;
