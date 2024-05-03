import React from 'react';
import { CCard, CCardBody, CCardHeader, CCardImage, CListGroup, CListGroupItem } from '@coreui/react';

const Profile = () => {
  // Data dummy untuk profil user
  const userProfile = {
    nama: "John Doe",
    email: "johndoe@example.com",
    alamat: "Jl. Kebon Jeruk No. 12, Jakarta",
    telepon: "+62 812 3456 7890",
    pekerjaan: "Software Developer"
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>Profil Pengguna</h3>
        </CCardHeader>
        <CCardBody>
          <CCardImage orientation="top" src="https://via.placeholder.com/150" />
          <CListGroup>
            <CListGroupItem><strong>Nama:</strong> {userProfile.nama}</CListGroupItem>
            <CListGroupItem><strong>Email:</strong> {userProfile.email}</CListGroupItem>
            <CListGroupItem><strong>Alamat:</strong> {userProfile.alamat}</CListGroupItem>
            <CListGroupItem><strong>Telepon:</strong> {userProfile.telepon}</CListGroupItem>
            <CListGroupItem><strong>Pekerjaan:</strong> {userProfile.pekerjaan}</CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Profile;
