import si from 'systeminformation'
import os from 'os'
// import { EventLogger } from 'node-windows'  // Solo para Windows

export async function collectSystemInfo() {
  try {
    // Solo para Windows
    // const log = new EventLogger('My Event Log')
    // log.info('Basic information about the system:')
    // log.info('OS:', os.platform(), os.release())
    // log.info('User:', os.userInfo().username)

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
      // currentLoad: '*',
      // processes: '*',
      // services: '*',
      virtualization: '*',
      bluetooth: '*',
      wifi: '*',
      usb: '*',
      users: '*',
      time: '*',
      cpuTemperature: '*'
    })

    // Agregar información adicional
    systemReport.currentUser = os.userInfo().username

    return systemReport
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
