import si from 'systeminformation'
import os from 'os'
import path from 'path'
import { app } from 'electron'
import fs from 'fs'

export async function collectSystemInfo() {
  try {
    // const alldata = await si.getAllData()
    // const systemReport = await si.get({
    //   system: '*',
    //   osInfo: '*',
    //   bios: '*',
    //   baseboard: '*',
    //   cpu: '*',
    //   //  cpuCache: '*',
    //   memLayout: '*', // Agregado para obtener información sobre la memoria RAM
    //   memoryLayout: '*', // Agregado para obtener información detallada sobre la memoria RAM
    //   graphics: '*',
    //   blockDevices: '*',
    //   battery: '*',
    //   audio: '*',
    //   networkInterfaces: '*',
    //   // currentLoad: '*',
    //   // processes: '*',
    //   // services: '*',
    //   virtualization: '*',
    //   bluetooth: '*',
    //   wifi: '*',
    //   usb: '*',
    //   users: '*',
    //   time: '*',
    //   cpuTemperature: '*'
    // })
    const appDirectory = path.dirname(app.getPath('exe'))
    const filePath = path.join(appDirectory, 'configUserConfig.json')

    let device_id = null
    try {
      const data = fs.readFileSync(filePath, 'utf8')

      device_id = JSON.parse(data)?.id_device
    } catch (error) {
      console.error('Error al leer el archivo de configuración:')
    }

    const datasystem = await si.get({
      baseboard: '*', // Información de la placa base
      battery: '*', // Información de la batería
      bios: '*', // Información de la BIOS
      diskLayout: '*', // Información del disco
      memLayout: '*', // Información de la memoria
      users: '*', // Información de los usuarios
      graphics: '*', // Información de la tarjeta gráfica
      networkInterfaces: '*', // Información de las interfaces de red
      uuid: '*', // UUID del sistema
      osInfo: '*' // Información del sistema operativo
    })
    const cpu = await si.cpu()

    datasystem.cpu = cpu
    datasystem.id_device = device_id
    datasystem.currentUser = os.userInfo().username

    return datasystem
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
