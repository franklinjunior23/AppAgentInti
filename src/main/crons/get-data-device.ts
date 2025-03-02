import { BrowserWindow } from 'electron'
import { collectSystemInfo } from '../SystemInfo'
import cron from 'node-cron'

export function getDataDevice(mainWindows: BrowserWindow, deviceData): void {
  cron.schedule('*/10 * * * * ', async () => {
    try {
      const data = await collectSystemInfo()
      deviceData = data
      console.log('Enviando datos del sistema...')
      mainWindows.webContents.send('SystemInfo', data)
    } catch (error) {
      console.error('Error al recopilar información del sistema:', error)
    }
  })
}
