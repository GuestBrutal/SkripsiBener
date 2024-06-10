import PropTypes from 'prop-types'
import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CButton, CCardHeader, CCardBody, CTable, CFormInput, CInputGroup, CInputGroupText, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import DataTable from 'react-data-table-component'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash } from '@coreui/icons'
import axios from 'axios'

const Pengeluaran = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalNotaVisible, setModalNotaVisible] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);
  const [kegiatan, setKegiatan] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/'+localStorage.getItem('UID'), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setKegiatan(response.data.kegiatan_id);
        const pengeluaran = await axios.get('http://localhost:8080/pengeluaran/'+response.data.kegiatan_id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setItems(pengeluaran.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: 'No',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Tanggal',
      selector: row => row.tanggal_pengeluaran,
      sortable: true,
      format: row => new Date(row.tanggal_pengeluaran).toLocaleDateString('id-ID',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    },
    {
      name: 'Deskripsi',
      selector: row => row.deskripsi_pengeluaran,
      sortable: true,
    },
    {
      name: 'Nota',
      selector: row => row.nota_pengeluaran ? <CButton size="sm" color="success" onClick={() => { setSelectedNota(row.nota_pengeluaran); setModalNotaVisible(true); }}>Ada</CButton> : <CButton size="sm" color="secondary" disabled>Tidak Ada</CButton>,
      sortable: true,
      center: "true",
    },
    {
      name: 'Harga',
      selector: row => parseInt(row.harga_pengeluaran).toLocaleString('id-ID',{
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 3,
      }),
      sortable: true,
    },
    {
      name: 'Qty',
      selector: row => row.qty_pengeluaran,
      sortable: true,
    },
    {
      name: 'Total',
      selector: row => parseInt(row.total_pengeluaran).toLocaleString('id-ID',{
        style: "currency",
        currency: "IDR",
        maximumSignificantDigits: 3,
      }),
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: row => (
       <>
          <CButton className='mx-1' color="info" size="sm" onClick={() => handleEdit(row)}>
            <CIcon icon={cilPencil} />
          </CButton>
          <CButton color="danger" size="sm" onClick={() => handleDelete(row.id)}>
            <CIcon icon={cilTrash} />
          </CButton>
        </>
      ),
    },
  ]

  useEffect(() => {
    if (items.length > 0) {
      const dates = items.map(item => {
        return new Date(item.tanggal_pengeluaran);
      });
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date();
      setFilterDateRange({ start: minDate.toISOString().split('T')[0], end: maxDate.toISOString().split('T')[0] });
    }
  }, [items]);

  useEffect(() => {
    const filtered = items.filter(item => {
      const date = new Date(item.tanggal_pengeluaran);
      const startDate = new Date(filterDateRange.start);
      const endDate = new Date(filterDateRange.end);
      return date >= startDate && date <= endDate && item.deskripsi_pengeluaran.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredData(filtered);
  }, [filterDateRange, searchText, items]);

  const totalJumlah = filteredData.reduce((acc, curr) => acc + parseInt(curr.total_pengeluaran), 0).toLocaleString('id-ID', {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });

  const handleAddPengeluaran = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('id_kegiatan', kegiatan);
    console.log(formData.get('nota_pengeluaran'));
    if (formData.get('nota_pengeluaran').size === 0) {
      formData.delete('nota_pengeluaran');
    }
    try {
      const response = await axios.post('http://localhost:8080/pengeluaran', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const newPengeluaran = {
        id: response.data.id,
        tanggal_pengeluaran: formData.get('tanggal_pengeluaran'),
        deskripsi_pengeluaran: formData.get('deskripsi_pengeluaran'),
        nota_pengeluaran: response.data.nota || null,
        harga_pengeluaran: parseInt(formData.get('harga_pengeluaran')),
        qty_pengeluaran: parseInt(formData.get('qty_pengeluaran')),
        total_pengeluaran: parseInt(formData.get('total_pengeluaran')),
        id_kegiatan: parseInt(formData.get('id_kegiatan')),
      };

      setItems([...items, newPengeluaran]);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalVisible(true);
  };

  const handleUpdatePengeluaran = (event) => {
    event.preventDefault();
    const updatedPengeluaran = {
      ...editItem,
      tanggal_pengeluaran: event.target.tanggal.value,
      deskripsi_pengeluaran: event.target.deskripsi.value,
      nota_pengeluaran: event.target.nota.files[0] ? event.target.nota.files[0] : editItem.nota_pengeluaran,
      harga_pengeluaran: parseInt(event.target.harga.value),
      qty_pengeluaran: parseInt(event.target.banyakbarang.value),
      total_pengeluaran: parseInt(event.target.harga.value) * parseInt(event.target.banyakbarang.value),
    };
    axios.put(`http://localhost:8080/pengeluaran/${editItem.id}`, updatedPengeluaran, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setItems(items.map(item => item.id === editItem.id ? updatedPengeluaran : item));
        setModalVisible(false);
        setEditItem(null);
      })
      .catch(error => {
        console.error('Error updating item: ', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/pengeluaran/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting item: ', error);
      });
  };

  return (
    <CCard className="p-4 shadow-sm" sm={6}>
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h4>Uang Keluar</h4>
        <CButton color="danger" onClick={() => setModalVisible(true)}>
          Tambah Pengeluaran
        </CButton>
      </CCardHeader>
      <div className="p-3">
        <CRow className="justify-content-between">
          <CRow className="w-auto">
            <CCol xs="auto">
              <div className="mb-2">
                <label htmlFor="tanggalMulai">Tanggal Awal</label>
                <CFormInput id="tanggalMulai" type="date" size="sm" value={filterDateRange.start} onChange={e => setFilterDateRange(prev => ({ ...prev, start: e.target.value }))} />
              </div>
            </CCol>
            <CCol xs="auto">
              <div className="mb-2">
                <label htmlFor="tanggalAkhir">Tanggal Akhir</label>
                <CFormInput id="tanggalAkhir" type="date" size="sm" value={filterDateRange.end} min={filterDateRange.start} onChange={e => setFilterDateRange(prev => ({ ...prev, end: e.target.value }))} />
              </div>
            </CCol>
          </CRow>
          <CCol xs="auto">
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Cari Deskripsi..."
                onChange={e => setSearchText(e.target.value)}
              />
            </CInputGroup>
          </CCol>
        </CRow>
      </div>
      <CCardBody>
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
        <div className="text-center">
          <strong>Total: {totalJumlah}</strong>
        </div>
      </CCardBody>
      <CModal visible={modalVisible} onClose={() => { setModalVisible(false); setEditItem(null); }}>
        <CModalHeader closeButton>{editItem ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}</CModalHeader>
        <CModalBody>
          <form onSubmit={editItem ? handleUpdatePengeluaran : handleAddPengeluaran} encType="multipart/form-data" >
            <div className="mb-3">
              <label htmlFor="tanggal">Tanggal:</label>
              <CFormInput id="tanggal" name='tanggal_pengeluaran' type="date" max={new Date().toISOString().split('T')[0]} required defaultValue={editItem ? editItem.tanggal_pengeluaran : ''} />
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi">Deskripsi:</label>
              <CFormInput id="deskripsi"name='deskripsi_pengeluaran' type="text" required defaultValue={editItem ? editItem.deskripsi_pengeluaran : ''} />
            </div>
            <div className="mb-3 d-flex justify-content-between flex-wrap">
              <label id='notaName'>Nota : {editItem ? editItem.nota_pengeluaran ? editItem.nota_pengeluaran : 'Tidak Ada' : '(Opsional)'}</label>
              <CButton
                color="info"
                size="sm"
                className={editItem && editItem.nota_pengeluaran ? "me-2" : ""}
                onClick={() => fileInputRef.current.click()}
              >
                {editItem && editItem.nota_pengeluaran ? "Ubah Nota" : "Tambah Nota"}
              </CButton>
              <CFormInput id="nota" name="nota_pengeluaran" type="file" accept="image/jpeg, image/png, image/jpg" ref={fileInputRef} onChange={e => {
                console.log(e.target.files);
                if (e.target.files.length > 0) {
                  fileInputRef.current.files = e.target.files;
                  document.getElementById('notaName').innerText = 'Nota : ' + fileInputRef.current.files[0].name;
                }else{
                  document.getElementById('notaName').innerText = 'Nota : (Opsional)';
                }
              }} className='d-none' />
            </div>
            <div className="mb-3">
              <label htmlFor="harga">Harga:</label>
              <CFormInput id="harga" name="harga_pengeluaran" type="number" required min="0" defaultValue={editItem ? editItem.harga_pengeluaran : ''} onChange={e => {
                const updatedTotal = parseInt(e.target.value) * parseInt(document.getElementById('banyakbarang').value || 0);
                document.getElementById('total').value = isNaN(updatedTotal) ? '' : updatedTotal;
              }} />
            </div>
            <div className="mb-3">
              <label htmlFor="banyakbarang">Banyak Barang:</label>
              <CFormInput id="banyakbarang" name="qty_pengeluaran" type="number" required min="1" defaultValue={editItem ? editItem.qty_pengeluaran : ''} onChange={e => {
                const updatedTotal = parseInt(e.target.value) * parseInt(document.getElementById('harga').value || 0);
                document.getElementById('total').value = isNaN(updatedTotal) ? '' : updatedTotal;
              }} />
            </div>
            <div className="mb-3">
              <label htmlFor="total">Total:</label>
              <CFormInput id="total" name="total_pengeluaran" type="number" required readOnly defaultValue={editItem ? editItem.total_pengeluaran : ''} />
            </div>
            <CButton type="submit" color="danger">{editItem ? 'Update' : 'Simpan'}</CButton>
          </form>
        </CModalBody>
      </CModal>
      <CModal visible={modalNotaVisible} onClose={() => setModalNotaVisible(false)}>
        <CModalHeader closeButton>Lihat Nota</CModalHeader>
        <CModalBody>
          {selectedNota ? <img src={`http://localhost:8080/nota/${selectedNota}`} alt="Nota" style={{ width: '100%' }} /> : <p>Nota tidak tersedia.</p>}
        </CModalBody>
      </CModal>
    </CCard>
  )
}

export default Pengeluaran
