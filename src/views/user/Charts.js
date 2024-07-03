import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CFormCheck } from '@coreui/react'
import { Gantt } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import axios from 'axios'

const Charts = () => {

  const defaultTasks = [
    { id: 1, name: 'Task 1', start: new Date(), end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), progress: 0, type: 'task', dependencies: [] }
  ];
  const [tasks, setTasks] = useState(defaultTasks);

  useEffect(() => {
    setTasks(defaultTasks);
    const fetchTasks = () => {
      const kegiatan_id = localStorage.getItem('kegiatan_id');
      axios.get(`http://smrapi.my.id//target/${kegiatan_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => {
          const fetchedTasks = response.data.map((item, index) => {
            const endDate = new Date(item.target_selesai);
            const isOverdue = new Date() > endDate;
            return {
              start: new Date(item.target_mulai),
              end: endDate,
              name: item.nama_target,
              id: `Target ${index}`,
              progress: item.tugas.length > 0 ? (item.tugas.filter(t => t.status === "Terlaksana").length / item.tugas.length) * 100 : 0,
              type: 'task',
              dependencies: [],
              styles: isOverdue ? { backgroundColor: 'red', progressColor: 'lime' } : {}
            };
          });
          setTasks(fetchedTasks);
      }).catch(error => {
        console.error('Error fetching tasks:', error);
      });
    };
    fetchTasks();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className='fw-bold'>Gantt Chart</CCardHeader>
          <CCardBody>
            <Gantt
              tasks={tasks}
              viewMode="Day"
              columnWidth={60}
              listCellWidth="200px"
              locale='id-ID'
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
