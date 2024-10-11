export const api_url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : 'https://dev.intisoft.com.pe/api/v1'

// Configuración de la aplicación
export const APP_NAME = 'AgentInventory'
export const AUTO_LAUNCH_HIDDEN = true

// Configuracion del id de la aplicacion
export const APP_ID = 'com.intisoft.agentinventory'

// Intervalo para recolectar la información del sistema (en segundos)
export const SYSTEM_INFO_INTERVAL = 10

// Otras constantes de configuración
export const ICON_PATH = '../../resources/icon.png?asset'
export const VERSION = '1.0.0'
