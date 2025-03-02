import si from 'systeminformation'
import os from 'os'
import fs from 'fs'
import { pathFileConfig } from './contants/name-config'

export async function collectSystemInfo() {
  try {
    let device_id = null
    
    try {
      const data = fs.readFileSync(pathFileConfig, 'utf8')

      device_id = JSON.parse(data)?.id_device
    } catch (error) {
      console.log(error.message)
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
      osInfo: '*' // Información del sistema operativo
    })
    const cpu = await si.cpu()

    const sizeFs = await si.fsSize()

    console.log(sizeFs)

    datasystem.cpu = cpu
    datasystem.id_device = device_id
    datasystem.currentUser = os.userInfo().username

    return datasystem
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
