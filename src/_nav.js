import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilPeople,
  cilUser,
  cilDescription,
  cilCalendar,
  cilCalendarCheck,
  cilNotes,
  cilList,
  cilCash,
  cilSpeedometer,
  cilStar,
  cilNoteAdd,
  cilInfo,
  cilHome,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navItems = [
  { title: 'Admin', isTitle: true },
  { name: 'Dashboard Admin', to: '/admin/dashboard', icon: cilSpeedometer },
  { name: 'Daftar Kegiatan', to: '/admin/daftarkegiatan', icon: cilList },
  { name: 'Manajemen Kecakapan', to: '/admin/kecakapan', icon: cilStar },
  { name: 'Manajemen Pengguna', to: '/admin/manajemenpengguna', icon: cilUser },
  { title: 'User', isTitle: true },
  { name: 'Beranda', to: '/', icon: cilHome },
  { name: 'Detail', to: '/user/dashboard', icon: cilInfo, badge: { color: 'info', text: 'NEW' } },
  { name: 'Relawan', to: '/user/relawan', icon: cilList },
  { name: 'Target', to: '/user/target', icon: cilBell },
  { name: 'Charts', to: '/user/charts', icon: cilChartPie },
  {
    name: 'Keuangan', icon: cilCash, children: [
      { name: 'Pemasukan', to: '/user/keuangan/pemasukan' },
      { name: 'Pengeluaran', to: '/user/keuangan/pengeluaran' }
    ]
  },
  { name: 'Tim', to: '/user/tim', icon: cilPeople },
  {
    name: 'Laporan', icon: cilNoteAdd, children: [
      { name: 'Mingguan', to: '/user/laporan/harian' },
      { name: 'Harian', to: '/user/laporan/mingguan' }
    ]
  },
  { name: 'Keluar', to: '/logout' },
];

const _nav = navItems.map(item => {
  if (item.isTitle) return { component: CNavTitle, name: item.title };
  if (item.children) {
    return {
      component: CNavGroup,
      name: item.name,
      icon: <CIcon icon={item.icon} customClassName="nav-icon" />,
      items: item.children.map(child => ({
        component: CNavItem,
        name: child.name,
        to: child.to
      }))
    };
  }
  return {
    component: CNavItem,
    name: item.name,
    to: item.to,
    icon: <CIcon icon={item.icon} customClassName="nav-icon" />,
    badge: item.badge
  };
});

export default _nav

