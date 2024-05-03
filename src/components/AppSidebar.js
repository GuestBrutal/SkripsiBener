import React from 'react'
import { useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibRedux, cifId } from '@coreui/icons'
import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow)

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
          <AppSidebarNav items={navigation} />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

