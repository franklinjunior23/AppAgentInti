import si from 'systeminformation'
import os from 'os'
import { exec } from 'child_process'
// import { EventLogger } from 'node-windows'  // Solo para Windows
function getInstalledApps() {
  exec('dpkg -l | grep "^ii"', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al obtener la lista de aplicaciones: ${err.message}`)
      return
    }

    // Divide la salida en líneas y filtra las líneas vacías
    const apps = stdout.split('\n').filter((app) => app.trim() !== '')

    // Muestra las aplicaciones en la consola
    console.log('Aplicaciones instaladas:')
    apps.forEach((app) => {
      console.log(app)
    })

  })

  // Windows
  exec('wmic product get name', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al obtener la lista de aplicaciones: ${err.message}`)
      return
    }

    // Divide la salida en líneas y filtra las líneas vacías
    const apps = stdout
      .split('\n')
      .filter((app) => app.trim() !== '')
      .slice(1)

    // Muestra las aplicaciones en la consola
    console.log('Aplicaciones instaladas:')
    apps.forEach((app) => {
      console.log(app)
    })

    // Muestra las aplicaciones en la interfaz de usuario
  })
}

export async function collectSystemInfo() {
  try {
    getInstalledApps()
    // Solo para Windows
    // const log = new EventLogger('My Event Log')
    // log.info('Basic information about the system:')
    // log.info('OS:', os.platform(), os.release())
    // log.info('User:', os.userInfo().username)
    // Función para obtener la lista de aplicaciones instaladas

    const alldata = await si.getAllData()

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
