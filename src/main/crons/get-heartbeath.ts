import { app, BrowserWindow } from 'electron'
import cron from 'node-cron'
import log from 'electron-log'
import Config from '../helper/get-config'
import 'dotenv/config'
import axios from 'axios'
import { cpuUsageData, diskUsageData, ramUsageData } from '../domain/cpu-memory-usage'

export function sendHeartbeat(mainWindows: BrowserWindow) {
  // cada 5 minutos
  cron.schedule('*/5 * * * *', async () => {
    heartBeath()
  })
}

export async function heartBeath() {
  try {
    const dataDevice = new Config().data

    const keyAuth = process.env.KEY_AUTH_AGENT
    const valueAuth = process.env.VALUE_AUTH_AGENT

    if (!dataDevice?.id_device) return
    const { data } = await axios.put(
      `${process.env.HEART_DEVICE}/${dataDevice.id_device}`,
      {
        appVersion: app.getVersion(),
        cpuUsage: Number(cpuUsageData) || 0,
        memoryUsage: Number(ramUsageData) || 0,
        diskUsage: diskUsageData || [],
        hearthbeatTime: dataDevice.heartbeatIntervalMinutes
      },
      {
        headers: {
          [keyAuth]: valueAuth
        }
      }
    )

    log.info('Heartbeat enviado correctamente:', data)
    new Config().update({
      updatedHeartbeat: new Date()
    })
  } catch (error) {
    console.log(error)
    log.error('Error al enviar el heartbeat:', error?.message)
  }
}
