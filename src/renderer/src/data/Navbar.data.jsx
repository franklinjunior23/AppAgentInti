import {
  IconDownload,
  IconHistory,
  IconInfoSquareRounded,
  IconLayoutDashboard,
  IconLifebuoy,
  IconSmartHome
} from '@tabler/icons-react'

export const DataNavbar = [
  { name: 'Dashboard', path: '/', icon: <IconSmartHome size={24} strokeWidth={1.5} /> },
  {
    name: 'Aplicaciones',
    path: '/aplications',
    icon: <IconLayoutDashboard size={24} strokeWidth={1.5} />
  },
  { name: 'Historial', path: '/history', icon: <IconHistory size={24} strokeWidth={1.5} /> },
  { name: 'Soporte', path: '/Support', icon: <IconLifebuoy size={24} strokeWidth={1.5} /> },
  { name: 'Actualizacion', path: '/Update', icon: <IconDownload size={24} strokeWidth={1.5} /> },
  { name: 'Ayuda', path: '/Help', icon: <IconInfoSquareRounded size={24} strokeWidth={1.5} /> }
]
