import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { Gantt } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'

const Charts = () => {
  const [tasks, setTasks] = useState([
    {
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 15),
      name: 'Perencanaan Proyek',
      id: "Task 0",
      progress: 25,
      type: 'task',
      dependencies: []
    },
    {
      start: new Date(2023, 0, 16),
      end: new Date(2023, 0, 31),
      name: 'Pengembangan Produk',
      id: "Task 1",
      progress: 45,
      type: 'task',
      dependencies: ["Task 0"]
    },
    {
      start: new Date(2023, 1, 1),
      end: new Date(2023, 1, 15),
      name: 'Pengujian dan Evaluasi',
      id: "Task 2",
      progress: 30,
      type: 'task',
      dependencies: ["Task 1"]
    },
    {
      start: new Date(2023, 1, 16),
      end: new Date(2023, 2, 1),
      name: 'Peluncuran Produk',
      id: "Task 3",
      progress: 60,
      type: 'task',
      dependencies: ["Task 2"]
    },
    {
      start: new Date(2023, 2, 2),
      end: new Date(2023, 2, 17),
      name: 'Pemasaran',
      id: "Task 4",
      progress: 75,
      type: 'task',
      dependencies: ["Task 3"]
    }
  ]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Gantt Chart</CCardHeader>
          <CCardBody>
            <Gantt
              tasks={tasks}
              viewMode="Day"
              columnWidth={60}
              listCellWidth="155px"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts

