import { BrowserWindow } from 'electron'
import { collectSystemInfo } from '../SystemInfo'
import cron from 'node-cron'

export function getDataDevice(mainWindows: BrowserWindow, deviceData): void {
  // cada 10 minutos
  cron.schedule('*/10 * * * * ', async () => {
    try {
      const data = await collectSystemInfo(mainWindows)
      deviceData = data
      console.log('Actualizando la data del dispositivo:')
      mainWindows.webContents.send('SystemInfo', data)
    } catch (error) {
      console.error('Error al recopilar información del sistema:', error)
    }
  })
}
