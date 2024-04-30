import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard,
  CCardBody,
  CCardFooter
} from '@coreui/react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CChartLine } from '@coreui/react-chartjs'

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
      label: 'Dataset Pertama Saya',
      backgroundColor,
      borderColor,
      data,
      fill: true
    }
  ]
})



const WidgetsDropdownUser = () => {
  return (
    <CRow>
      <h4>Monitoring Tugas</h4>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="white"
          value={
            <>
              <span style={{ color: 'orange' }}>4 (40%)</span>
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
          value={<><span style={{ color: 'green' }}>6 (60%)</span></>}
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
          value={<><span style={{ color: 'red' }}>0</span></>}
          title={<span style={{ color: 'red' }}>Tertunda</span>}
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
            <div style={{width:'100px',height:'100px'}}>
              <CircularProgressbar
                value={75}
                text={'75%'}
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
              <CCol sm={6} className='m-0 p-0' style={{ borderRight: '2px solid #dee2e6'}}>
                <div>
                  <h6 style={{ fontSize: '8px', textAlign: 'center',margin:'0',fontWeight:'bold' }}>Selesai</h6>
                  <h6 style={{ fontSize: '16px', textAlign: 'center',margin:'0' }}>3</h6>
                </div>
              </CCol>
              <CCol sm={6} className='m-0 p-0'>
                <div>
                  <h6 style={{ fontSize: '8px', textAlign: 'center',margin:'0',fontWeight:'bold' }}>Dalam Pelaksanaan</h6>
                  <h6 style={{ fontSize: '16px', textAlign: 'center',margin:'0' }}>4</h6>
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


