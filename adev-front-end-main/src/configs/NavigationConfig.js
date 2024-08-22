import {
  DashboardOutlined, FieldTimeOutlined, WarningOutlined, DashOutlined,
  GroupOutlined, GlobalOutlined, ScheduleOutlined, 
  BookOutlined,SettingOutlined,CalendarOutlined, 
  ProfileOutlined, UserOutlined, QrcodeOutlined 
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'Home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Home',
  breadcrumb: false,
  submenu: [{
    key: 'Dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: GlobalOutlined,
    breadcrumb: false,
    submenu: []
  }]
}]

const analyticsNavTree = [{
  key: 'Karyawan',
  path: `${APP_PREFIX_PATH}/karyawan`,
  title: 'Karyawan',
  breadcrumb: false,
  submenu: [
    {
      key: 'Karyawan Aktif',
      path: `${APP_PREFIX_PATH}/karyawan-aktif`,
      title: 'Daftar Karyawan Aktif',
      icon: ProfileOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Karyawan Non Aktif',
      path: `${APP_PREFIX_PATH}/karyawan-off`,
      title: 'Daftar Karyawan Off',
      icon: CalendarOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Calendar',
      path: `${APP_PREFIX_PATH}/calendar`,
      title: 'Calendar',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Analisa Karyawan',
      path: `${APP_PREFIX_PATH}/analisa-karyawan`,
      title: 'Analisa Karyawan',
      icon: GroupOutlined,
      breadcrumb: false,
      submenu: [{
        key: 'Daftar Analisa Karyawan',
        path: `${APP_PREFIX_PATH}/analisa-karyawan`,
        title: 'Daftar Karyawan',
        breadcrumb: false,
        submenu: []
      },{
        key: 'Cari Analisa Karyawan',
        path: `${APP_PREFIX_PATH}/cari-analisa-karyawan`,
        title: 'Cari Karyawan',
        breadcrumb: false,
        submenu: []
      },{
        key: 'Download Analisa Karyawan',
        path: `${APP_PREFIX_PATH}/download-analisa-karyawan`,
        title: 'Download',
        breadcrumb: false,
        submenu: []
      }]
    },
    {
      key: 'Bad Employee',
      path: `${APP_PREFIX_PATH}/bad-employee`,
      title: 'Bad Employee',
      icon: WarningOutlined,
      breadcrumb: false,
      submenu: [{
        key: 'Daftar Bad Karyawan',
        path: `${APP_PREFIX_PATH}/bad-employee`,
        title: 'Hari Ini',
        breadcrumb: false,
        submenu: []
      },{
        key: 'Cari Bad Karyawan',
        path: `${APP_PREFIX_PATH}/cari-bad-employee`,
        title: 'Pencarian',
        breadcrumb: false,
        submenu: []
      },{
        key: 'Download Bad Karyawan',
        path: `${APP_PREFIX_PATH}/download-bad-employee`,
        title: 'Pencarian Rentang',
        breadcrumb: false,
        submenu: []
      }]
    },
    {
      key: 'Analisa Report',
      path: `${APP_PREFIX_PATH}/analisa-report`,
      title: 'Analisa Report',
      icon: FieldTimeOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'My Report',
          path: `${APP_PREFIX_PATH}/analisa-report`,
          title: 'My Report',
          breadcrumb: false,
          submenu: []
        }
      ]
    }
  ]
}]

const usersTree = [{
  key: 'Account',
  path: `${APP_PREFIX_PATH}/profile`,
  title: 'Pengaturan',
  breadcrumb: false,
  submenu: [
    {
      key: 'Karyawan',
      path: `${APP_PREFIX_PATH}/daftar-karyawan`,
      title: 'Daftar Karyawan',
      icon: BookOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Hari Libur',
      path: `${APP_PREFIX_PATH}/config-weekend`,
      title: 'Hari Libur',
      icon: ScheduleOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Shift',
      path: `${APP_PREFIX_PATH}/shift-karyawan`,
      title: 'Shift Siang/Malam',
      icon: DashOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'QRCode',
      path: `${APP_PREFIX_PATH}/barcode`,
      title: 'Data QRCode',
      icon: QrcodeOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Pengaturan',
      path: `${APP_PREFIX_PATH}/settings`,
      title: 'Akun',
      icon: SettingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'Admin',
      path: `${APP_PREFIX_PATH}/daftar-admin`,
      title: 'Daftar Admin',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: []
    }
]
}]

const navigationConfig = [
  ...dashBoardNavTree,
  ...analyticsNavTree,
  ...usersTree
]

export default navigationConfig;
