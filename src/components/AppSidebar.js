import React from 'react'
import { useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibRedux } from '@coreui/icons'
import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const role = localStorage.getItem('role');
  const kegiatan_id = localStorage.getItem('kegiatan_id');
  return (
    <CSidebar
      position="fixed"
      narrow={!sidebarShow}
    >
      <CSidebarBrand to="/">
        <CIcon icon={cibRedux} height={35} className='mx-2' />
        {sidebarShow && <span className='mx-2 text-center fw-bold '> Sistem Manajemen Relawan</span>}
      </CSidebarBrand>
      <CSidebarNav className="noScrollbar">
          <AppSidebarNav items={navigation(role,kegiatan_id)} />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

