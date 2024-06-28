import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CBadge } from '@coreui/react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Select from 'react-select';

const DaftarKoordinator = ({props}) => {
  const [kecakapan, setKecakapan] = useState([]);
  const [koordinator, setKoordinator] = useState([]);
  const [selectedKegiatan, setSelectedKegiatan] = useState(props);

  useEffect(() => {
    fetchKecakapan();
    fetchKoordinator();
  }, []);

  const fetchKecakapan = async () => {
    const url = 'http://localhost:8080/kecakapan';
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setKecakapan(response.data);
      } else {
        console.error('Failed to fetch kecakapan');
      }
    } catch (error) {
      console.error('Error fetching kecakapan:', error);
    }
  };

  const fetchKoordinator = async () => {
    const url = `http://localhost:8080/koordinatorKecakapan/kegiatan/${selectedKegiatan.no}`;
    try {
      const response = await axios.get(url, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setKoordinator(response.data);
      } else {
        console.error('Failed to fetch koordinator');
      }
    } catch (error) {
      console.error('Error fetching koordinator:', error);
    }
  };


  const updateKoordinator = async (e,kecakapan) => {
    const url = `http://localhost:8080/koordinatorKecakapan/${e.value}`;
    try {
      const response = await axios.put(url, {
        kegiatan_id: selectedKegiatan.no,
        type: 'assign',
        id_kecakapan : kecakapan
      }, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        fetchKoordinator();
      } else {
        console.error('Failed to fetch koordinator');
      }
    } catch (error) {
      console.error('Error fetching koordinator:', error);
    }
  }


  return (
    <CCard>
      <CCardBody>
          <table className='table table-striped w-100'>
            <thead>
              <tr className='align-items-center text-center'>
                <th>No</th>
                <th>Kecakapan</th>
                <th>Koordinator</th>
              </tr>
            </thead>
            <tbody>
              {kecakapan.map((item, index) => (
                <tr className='align-items-center text-center' key={item.id}>
                  <td>{index+1}</td>
                  <td><CBadge color={item.warna}>{item.nama}</CBadge></td>
                  <td>
                    <Select
                      id={item.id}
                      options={koordinator.filter(k => k.id_kecakapan === item.id).map(k => ({value: k.id, label: k.nama}))}
                      placeholder='Pilih Koordinator'
                      isSearchable={true}
                      onChange={(e) => {updateKoordinator(e,item.id)}}
                      value={koordinator.filter(k => k.id_kecakapan === item.id && k.kegiatan_id === selectedKegiatan.no).map(k => ({value: k.id, label: k.nama}))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </CCardBody>
    </CCard>
  );
};

export default DaftarKoordinator;
