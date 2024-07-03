import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { CChartBar } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilPlus,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdownAdmin from '../widgets/WidgetsDropdownAdmin'

const DashboardAdmin = () => {
  const [visible, setVisible] = useState(false);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);

  useEffect(() => {
    axios.get('https://smrapi.my.id/pengeluaran',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setDataPengeluaran(response.data);
      })
      .catch(error => {
        console.error('Ada kesalahan dalam mengambil data pengeluaran:', error);
      });
  }, []);

const exportToExcel = async () => {
  try {
    const pengeluaranResponse = await axios.get('https://smrapi.my.id/pengeluaran/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const pengeluaranData = pengeluaranResponse.data.map(item => ({
      Tanggal: item.tanggal_pengeluaran,
      Keterangan: item.deskripsi_pengeluaran,
      Debit: '',
      Kredit: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total_pengeluaran)
    }));

    const combinedData = [...pemasukanData, ...pengeluaranData];

    // Mengurutkan data berdasarkan 'Tanggal'
    combinedData.sort((a, b) => new Date(a.Tanggal) - new Date(b.Tanggal));

    // Menambahkan total di footer
    const totalKredit = pengeluaranResponse.data.reduce((acc, item) => acc + parseInt(item.total_pengeluaran), 0);

    combinedData.push({
      Tanggal: '',
      Keterangan: 'Total',
      Debit: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalDebit),
      Kredit: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalKredit)
    });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Menambahkan header
      worksheet.columns = [
        { header: 'Tanggal', key: 'Tanggal',width: 15 },
        { header: 'Keterangan', key: 'Keterangan',width: 30 },
        { header: 'Debit', key: 'Debit',width: 20 },
        { header: 'Kredit', key: 'Kredit',width: 20 }
      ];
      // Menambahkan data
      combinedData.forEach((data, index) => {
        const row = worksheet.addRow(data);
      });

    worksheet.mergeCells(combinedData.length+1,1,combinedData.length+1,2);
    const header = worksheet.getRow(1);
    header.height = 25;
    const footer = worksheet.lastRow;
    footer.height = 25;
    worksheet.getCell(combinedData.length+1,1).value = "Total";
      // Menambahkan border dan format mata uang
      worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.font = {
            name: 'Calibri',
            size: 12
          };
          if (rowNumber === 1 || rowNumber === combinedData.length + 1) {
            row.eachCell({ includeEmpty: true }, function (cell) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'D3D3D3' } // Warna abu-abu terang
              };
              cell.font = {
                name: 'Calibri',
                size: 12,
                bold: true
              };
              cell.alignment = {
                horizontal: 'center',
                vertical:'middle'
              };
            });
          }
        });
      });

    // Menyimpan file
      const todayDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('_').join('');
      const todayHour = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).split('.').join('');
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `RAB_Realisasi_${todayDate}${todayHour}.xlsx`;
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
};


  return (
    <>
      <WidgetsDropdownAdmin />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Laporan Pengeluaran
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: dataPengeluaran.map(item => item.tanggal),
              datasets: [
                {
                  label: 'Realisasi',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: dataPengeluaran.map(item => item.pengeluaran),
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

    </>
  )
}

export default DashboardAdmin
