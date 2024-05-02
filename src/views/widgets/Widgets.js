import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import relawan from 'src/assets/images/relawan.jpg'

const Widgets = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const activities = [
    {
      id: 1,
      title: "Pembersihan Pantai",
      cover: relawan,
      description: "Bersih-bersih pantai untuk menjaga kelestarian lingkungan.",
      startTime: "2021-09-01 10:00",
      endTime: "2021-09-01 12:00",
      location: "Pantai Pasir Putih, Lampung",
    },
    {
      id: 2,
      title: "Pembersihan Pantai",
      cover: relawan,
      description: "Bersih-bersih pantai untuk menjaga kelestarian lingkungan.",
      startTime: "2021-09-01 10:00",
      endTime: "2021-09-01 12:00",
      location: "Pantai Pasir Putih, Lampung",
    },
    {
      id: 3,
      title: "Pembersihan Pantai",
      cover: relawan,
      description: "Bersih-bersih pantai untuk menjaga kelestarian lingkungan.",
      startTime: "2021-09-01 10:00",
      endTime: "2021-09-01 12:00",
      location: "Pantai Pasir Putih, Lampung",
    },
    // ... (sisa data kegiatan)
  ];

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>Current Activities</CCardHeader>
      <CCardBody>
        <CRow>
          {activities.map((activity) => (
            <CCol key={activity.id} xs={12} sm={6} lg={3}>
              <CCard
                className={`mb-4 ${expandedCard === activity.id ? 'expanded' : ''}`}
                style={{ transition: 'all 0.3s ease', width: expandedCard === activity.id ? '100%' : 'initial' }}
              >
                <img src={activity.cover} alt="Activity Cover" style={{ width: '100%' }} />
                <CCardBody>
                  <h5>{activity.title}</h5>
                  <CButton color="primary" onClick={() => toggleExpand(activity.id)}>
                    Details
                  </CButton>
                  {expandedCard === activity.id && (
                    <div className="mt-3">
                      <p>{activity.description}</p>
                      <p>Start: {activity.startTime}</p>
                      <p>End: {activity.endTime}</p>
                      <p>Location: {activity.location}</p>
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Widgets

