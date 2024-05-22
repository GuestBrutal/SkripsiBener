import React from 'react';
import { CCard, CCardBody, CCardHeader, CCardImage, CListGroup, CListGroupItem } from '@coreui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Profile = () => {

  const [userProfile, setUserProfile] = useState({
    nama: "Administrator",
    email: "admin@gmail.com",
  });


  return (
    <>
      <CCard style={{ border: 'none' }}>
        <CCardHeader>
          <h3>Profil Pengguna</h3>
        </CCardHeader>
        <CCardBody>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none' }}>
            <tbody>
              <tr><td><strong>Nama</strong></td><td>: {userProfile.nama}</td></tr>
              <tr><td><strong>Email</strong></td><td>: {userProfile.email}</td></tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Profile;
