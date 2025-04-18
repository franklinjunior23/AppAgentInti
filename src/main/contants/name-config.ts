import path from 'path'
import { app } from 'electron'

export const directoryApplication =
  process.platform === 'win32'
    ? path.join(process.env['ProgramData'], 'agente-intisoft')
    : app.getPath('appData')

export const pathFileConfig = path.join(directoryApplication, 'configUserConfig.json')
export const pathFileDbConfig = path.join(directoryApplication, 'database_device.db')
export const pathFileDbDevice = path.join(directoryApplication, 'device-data.json')
export const pathFileSoftwareList = path.join(directoryApplication, 'installed-software.json')
