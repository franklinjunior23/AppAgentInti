import si from 'systeminformation'
import os from 'os'
import Config from './helper/get-config'

export async function collectSystemInfo() {
  try {

    let deviceId = null

    try {

      const config = new Config()
      deviceId = config.get().id_device
      
      console.error('Archivo de configuracion leido correctamente : collectSystemInfo')
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
      osInfo: '*', // Información del sistema operativo
      uuid:'*'
    })
    const cpu = await si.cpu()

    const sizeFs = await si.fsSize()

    console.log(sizeFs)

    datasystem.cpu = cpu
    datasystem.id_device = deviceId
    datasystem.currentUser = os.userInfo().username

    return datasystem
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
