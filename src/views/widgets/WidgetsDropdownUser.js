import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard,
  CCardBody,
  CCardFooter
} from '@coreui/react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CChartLine } from '@coreui/react-chartjs'

const WidgetsDropdownUser = () => {
  const [tugas, setTugas] = useState([]);
  const [tugasSelesai, setTugasSelesai] = useState({jumlah: 0, persentase: 0});
  const [tugasDalamPelaksanaan, setTugasDalamPelaksanaan] = useState({jumlah: 0, persentase: 0});
  const [tugasTidakTerlaksana, setTugasTidakTerlaksana] = useState({jumlah: 0, persentase: 0});

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 0,
        hoverRadius: 0
      }
    }
  }

  const chartData = (backgroundColor, borderColor, data) => ({
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli'],
    datasets: [
      {
        label: 'Desain',
        backgroundColor,
        borderColor,
        data,
        fill: true
      }
    ]
  })

  useEffect(() => {
    const fetchDataTarget = async () => {
      try {
        const response = await axios.get('http://localhost:8080/target/' + localStorage.getItem('kegiatan_id'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const tugas = response.data.flatMap(tugas => tugas.tugas);
        const target = response.data;
        const tugasTerlewat = target.filter(target => new Date() > new Date(target.target_selesai)).flatMap(target => target.tugas);
        const selesai = tugas.filter(tugas => tugas.status === 'Terlaksana').length;
        const dalamPelaksanaan = tugas.filter(tugas => (tugas.status === 'Belum Terlaksana' && !tugasTerlewat.includes(tugas))).length;
        let tidakTerlaksana = 0;
        const jumlah = tugas.length;
        if (tugasTerlewat.length > 0) {
          tidakTerlaksana += tugasTerlewat.filter(tugas => tugas.status !== 'Terlaksana').length;
        }
        if(jumlah === 0){
          setTugasSelesai({jumlah: 0, persentase: 0});
          setTugasDalamPelaksanaan({jumlah: 0, persentase: 0});
          setTugasTidakTerlaksana({jumlah: 0, persentase: 0});
        }else {
          setTugasSelesai({jumlah: selesai, persentase: (selesai / jumlah) * 100});
          setTugasDalamPelaksanaan({jumlah: dalamPelaksanaan, persentase: (dalamPelaksanaan / jumlah) * 100});
          setTugasTidakTerlaksana({jumlah: tidakTerlaksana, persentase: (tidakTerlaksana / jumlah) * 100});
        }
        setTugas(tugas);
      } catch (error) {
        console.error('Error fetching data target:', error);
      }
    };

    fetchDataTarget();
  }, []);

  return (
    <CRow>
      <h4>Monitoring Tugas</h4>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="white"
          value={
            <>
              <span style={{ color: 'orange' }}>{tugasDalamPelaksanaan.jumlah} ({tugasDalamPelaksanaan.persentase.toFixed(0)}%)</span>
            </>
          }
          title={<span style={{ color: 'orange' }}>Dalam Pelaksanaan</span>}
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={chartData('rgba(255,165,0,0.2)', 'rgba(255,165,0,0.55)', [78, 81, 80, 45, 34, 12, 40])}
              options={chartOptions}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="white"
          value={<><span style={{ color: 'green' }}>{tugasSelesai.jumlah} ({tugasSelesai.persentase.toFixed(0)}%)</span></>}
          title={<span style={{ color: 'green' }}>Selesai</span>}
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={chartData('rgba(40,167,69,.2)', 'rgba(40,167,69,.55)', [78, 81, 80, 45, 34, 12, 40])}
              options={chartOptions}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="white"
          value={<><span style={{ color: 'red' }}>{tugasTidakTerlaksana.jumlah} ({tugasTidakTerlaksana.persentase.toFixed(0)}%)</span></>}
          title={<span style={{ color: 'red' }}>Tidak Terlaksana</span>}
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={chartData('rgba(255,0,0,.2)', 'rgba(255,0,0,.55)', [78, 81, 80, 45, 34, 12, 40])}
              options={chartOptions}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CCard className="mb-4">
          <CCardBody className='d-flex justify-content-center m-1 p-1'>
            <div style={{ width: '100px', height: '100px' }}>
              <CircularProgressbar
                value={tugasSelesai.persentase}
                text={tugasSelesai.persentase.toFixed(0) + '%'}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: "round",
                  trailColor: "#eee"
                })}
              />
            </div>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol sm={6} className='m-0 p-0' style={{ borderRight: '2px solid #dee2e6' }}>
                <div>
                  <h6 style={{ fontSize: '8px', textAlign: 'center', margin: '0', fontWeight: 'bold' }}>Selesai</h6>
                  <h6 style={{ fontSize: '16px', textAlign: 'center', margin: '0' }}>{tugasSelesai.jumlah}</h6>
                </div>
              </CCol>
              <CCol sm={6} className='m-0 p-0'>
                <div>
                  <h6 style={{ fontSize: '8px', textAlign: 'center', margin: '0', fontWeight: 'bold' }}>Total Tugas</h6>
                  <h6 style={{ fontSize: '16px', textAlign: 'center', margin: '0' }}>{tugas.length}</h6>
                </div>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdownUser
