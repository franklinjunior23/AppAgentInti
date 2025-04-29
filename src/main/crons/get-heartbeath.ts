import { app, BrowserWindow } from 'electron'
import cron from 'node-cron'
import log from 'electron-log'
import Config from '../helper/get-config'
import 'dotenv/config'
import axios from 'axios'

export async function sendHeartbeat(mainWindows: BrowserWindow) {
  // cada 5 minutos
  cron.schedule('*/5 * * * *', async () => {
    const dataDevice = new Config().data
    if (!dataDevice.id_device) return

    try {
      const { data } = await axios.post(process.env.HEART_DEVICE, {
        deviceId: dataDevice.id_device,
        appVersion: app.getVersion(),
        hearthbeatTime: dataDevice.heartbeatIntervalMinutes
      })

      new Config().update({
        updatedHeartbeat: new Date()
      })
    } catch (error) {
      log.error('Error al enviar el heartbeat: ee', error)
    }
  })
}
