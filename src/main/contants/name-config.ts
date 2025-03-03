import path from 'path'
import { app } from 'electron'

export const directoryApplication =
  process.platform === 'win32'
    ? path.join(process.env['ProgramData'], 'agente-intisoft')
    : app.getPath('appData')

export const pathFileConfig = path.join(directoryApplication, 'configUserConfig.json')

export const pathFileDbConfig = path.join(directoryApplication, 'database_device.db')