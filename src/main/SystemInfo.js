import si from 'systeminformation'
import os from 'os'
import Config from './helper/get-config'
import Logger from 'electron-log'

import { EventsService } from './config/events/event-service'

let mainWindows = null

export async function collectSystemInfo(mainWindow) {
  try {
    mainWindows = mainWindow
    let deviceId = null

    const config = new Config()

    deviceId = config.get().id_device
    const existDataDevice = config.getDeviceData()


    if (!existDataDevice) {
      const [cpu, sizeStorage] = await Promise.all([si.cpu(), si.fsSize()])

      const systemData = await si.get({
        baseboard: '*',
        battery: 'hasBattery',
        bios: '*',
        diskLayout: '*',
        memLayout: '*',
        graphics: '*',
        networkInterfaces: '*',
        uuid: '*',
        osInfo: '*'
      })

      config.setDeviceData({
        ...systemData,
        cpu,
        id_device: deviceId,
        currentUser: os.userInfo().username,
        storage: sizeStorage
      })

      return {
        ...systemData,
        cpu,
        id_device: deviceId,
        currentUser: os.userInfo().username,
        storage: sizeStorage
      }
    } else {
      return existDataDevice
    }
  } catch (error) {
    Logger.error('Error al traer la informacion', error?.message)
    return null
  }
}

EventsService.on('update', ({ cpuUsage, ramUsage, diskUsage }) => {
  if (mainWindows) {
    mainWindows.webContents.send('system-stats', { cpuUsage, ramUsage, diskUsage })
  }
})
