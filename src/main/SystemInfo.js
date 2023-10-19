import si from 'systeminformation'
import os from 'os'
import { EventLogger } from 'node-windows'

export async function collectSystemInfo() {
  try {
    const eventLog = new EventLogger('hola mundo')

    eventLog.warn('Watch out!')
    const systemReport = await si.get({
      system: '*',
      osInfo: '*',
      bios: '*',
      baseboard: '*',
      cpu: '*',
      //  cpuCache: '*',
      memLayout: '*', // Agregado para obtener información sobre la memoria RAM
      memoryLayout: '*', // Agregado para obtener información detallada sobre la memoria RAM
      graphics: '*',
      blockDevices: '*',
      battery: '*',
      audio: '*',
      networkInterfaces: '*',
      currentLoad: '*',
      processes: '*',
      services: '*',
      virtualization: '*',
      bluetooth: '*',
      wifi: '*',
      usb: '*',
      users: '*',
      time: '*',
      cpuTemperature: '*'
    })
    console.log(eventLog)
    // Agregar información adicional
    systemReport.currentUser = os.userInfo().username

    return systemReport
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
