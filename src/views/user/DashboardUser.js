import React, { useState, useEffect } from 'react'
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
  CForm,
  CFormInput,
  CFormSelect
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import ExcelJS from 'exceljs'
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
} from '@coreui/icons'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdownUser from '../widgets/WidgetsDropdownUser'

const DashboardUser = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rabData, setRabData] = useState([]);
  const [realisasiData, setRealisasiData] = useState([]);
  const [tanggal, setTanggal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rabResponse = await axios.get('http://localhost:8080/rab_realisasi/'+localStorage.getItem('kegiatan_id'),{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRabData(rabResponse.data.flatMap(item => item.pemasukan));
        setRealisasiData(rabResponse.data.flatMap(item => item.pengeluaran));
        setTanggal(rabResponse.data.flatMap(item => item.tanggal));

        // Inisialisasi startDate dan endDate
        const dates = rabResponse.data.flatMap(item => item.tanggal);
        if (dates.length > 0) {
          setStartDate(dates[0]);
          setEndDate(dates[dates.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

const exportToExcel = async () => {
  try {
    const pemasukanResponse = await axios.get('http://localhost:8080/pemasukan/' + localStorage.getItem('kegiatan_id'), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const pengeluaranResponse = await axios.get('http://localhost:8080/pengeluaran/' + localStorage.getItem('kegiatan_id'), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const pemasukanData = pemasukanResponse.data.map(item => ({
      Tanggal: item.tanggal,
      Keterangan: item.deskripsi,
      Debit: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.jumlah),
      Kredit: ''
    }));

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
    const totalDebit = pemasukanResponse.data.reduce((acc, item) => acc + parseInt(item.jumlah), 0);
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


  const dummyData = {
    labels: tanggal,
    datasets: [
      {
        label: 'RAB',
        backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
        borderColor: getStyle('--cui-info'),
        pointHoverBackgroundColor: getStyle('--cui-info'),
        borderWidth: 2,
        data: rabData,
        fill: true,
      },
      {
        label: 'Realisasi',
        backgroundColor: 'transparent',
        borderColor: getStyle('--cui-success'),
        pointHoverBackgroundColor: getStyle('--cui-success'),
        borderWidth: 2,
        data: realisasiData,
      },
    ],
  };

  const filteredData = {
    labels: dummyData.labels.filter((date, index) => date >= startDate && date <= endDate),
    datasets: dummyData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.filter((_, index) => dummyData.labels[index] >= startDate && dummyData.labels[index] <= endDate)
    }))
  };

  return (
    <>
      <WidgetsDropdownUser />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                RAB / Realisasi
              </h4>
              <CRow>
                <CCol xs={12}>
                  <CForm className="d-flex">
                    <CFormInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <CFormInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </CForm>
                </CCol>
              </CRow>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end" onClick={exportToExcel}>
                <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={filteredData}
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

export default DashboardUser
