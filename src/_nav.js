import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilPeople,
  cilUser,
  cilList,
  cilCash,
  cilSpeedometer,
  cilStar,
  cilNoteAdd,
  cilInfo,
  cilHome,
  cilRoom,
  cilBook,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const navItems = (role,kegiatan_id) => [
  ...(role === 'admin' ? [
    { title: 'Admin', isTitle: true },
    { name: 'Dashboard Admin', to: '/admin/dashboard', icon: cilSpeedometer },
    { name: 'Daftar Kegiatan', to: '/admin/daftarkegiatan', icon: cilList },
    { name: 'Manajemen Kecakapan', to: '/admin/kecakapan', icon: cilStar },
    { name: 'Manajemen Pengguna', to: '/admin/manajemenpengguna', icon: cilUser },
  ] : [
    ...(role === '-' || (role === 'koordinator' && kegiatan_id == 0) ? [
      { title: 'User', isTitle: true },
      { name: 'Beranda', to: '/user/beranda', icon: cilHome },
      ...(role !== 'koordinator' ? [
        { name: 'Relawan', to: '/user/relawan', icon: cilList },
      ] : []),
    ] : [
      ...(kegiatan_id !== 0 ? [
        { title: 'Kegiatan Relawan', isTitle: true },
        { name: 'Detail', to: '/user/dashboard', icon: cilInfo, },
        { name: 'Gantt Charts', to: '/user/charts', icon: cilChartPie },
        {
          name: 'Keuangan', icon: cilCash, children: [
            { name: 'Pemasukan', to: '/user/keuangan/pemasukan' },
            { name: 'Pengeluaran', to: '/user/keuangan/pengeluaran' }
          ]
        },
        { name: 'Tim', to: '/user/tim', icon: cilPeople },
        { name: 'Target', to: '/user/target', icon: cilBell },
        ...(role === 'Ketua' ? [
          { name: 'Laporan Mingguan', to: '/user/laporan/mingguan',icon: cilBook },
        ] : [
          ...(role === 'koordinator' ? [
            { name: 'Laporan Harian', to: '/user/laporan/harian',icon: cilBook }
          ]:[]),
        ]),
      ] : []),
    ]),
  ]),
  { name: 'Keluar', to: '/logout', icon: cilRoom },
];

const _nav = (role, kegiatan_id) => navItems(role, kegiatan_id).map(item => {
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

