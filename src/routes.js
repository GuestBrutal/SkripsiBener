import React from 'react'

// Lazy imports for User Views
const DashboardUser = React.lazy(() => import('./views/user/DashboardUser'))
const Beranda = React.lazy(() => import('./views/user/Beranda'))
const Target = React.lazy(() => import('./views/user/Target'))
const Profile = React.lazy(() => import('./views/user/Profile'))
const Pemasukan = React.lazy(() => import('./views/user/keuangan/pemasukan'))
const Pengeluaran = React.lazy(() => import('./views/user/keuangan/pengeluaran'))
const Tim = React.lazy(() => import('./views/user/Tim'))
const Relawan = React.lazy(() => import('./views/user/Relawan'))
const LaporanHarian = React.lazy(() => import('./views/user/laporan/LaporanMingguan'))
const LaporanMingguan = React.lazy(() => import('./views/user/laporan/LaporanHarian'))
const Charts = React.lazy(() => import('./views/charts/Charts'))


// Lazy imports for Admin Views
const DashboardAdmin = React.lazy(() => import('./views/admin/DashboardAdmin'))
const DaftarKegiatan = React.lazy(() => import('./views/admin/DaftarKegiatan'))
const UserManagement = React.lazy(() => import('./views/admin/UserManagement'))


const routes = [
  { path: '/', exact: true, name: 'Home', element: Beranda, requiresAuth: true },
  { path: '/admin/manajemenpengguna', name: 'Manajemen Pengguna', element: UserManagement, requiresAuth:true },
  { path: '/admin/dashboard', name: 'Dashboard Admin', element: DashboardAdmin, requiresAuth:true },
  { path: '/user/profile', name: 'Profile', element: Profile, requiresAuth:true },
  { path: '/user/dashboard', name: 'Dashboard User', element: DashboardUser, requiresAuth:true },
  { path: '/admin/daftarkegiatan', name: 'Daftar Kegiatan', element: DaftarKegiatan, requiresAuth:true },
  { path: '/user/relawan', name: 'Relawan', element: Relawan, requiresAuth:true },
  { path: '/user/charts', name: 'Charts', element: Charts, requiresAuth:true },
  { path: '/user/keuangan/pemasukan', name: 'Pemasukan', element: Pemasukan, requiresAuth:true },
  { path: '/user/keuangan/pengeluaran', name: 'Pengeluaran', element: Pengeluaran, requiresAuth:true },
  { path: '/user/tim', name: 'Tim', element: Tim, requiresAuth:true },
  { path: '/user/laporan/harian', name: 'Harian', element: LaporanHarian, requiresAuth:true },
  { path: '/user/target', name: 'Target', element: Target, requiresAuth:true },
  { path: '/user/laporan/mingguan', name: 'Mingguan', element: LaporanMingguan, requiresAuth:true },
]

export default routes
