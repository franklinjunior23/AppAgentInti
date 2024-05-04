import si from 'systeminformation'
import os from 'os'
import { exec } from 'child_process'
// import { EventLogger } from 'node-windows'  // Solo para Windows

// var aplications = null

// function getInstalledApps() {
//   if (process.platform === 'win32') {
//     // Windows
//     exec('wmic product get name,version,description', (err, stdout, stderr) => {
//       if (err) {
//         console.error(`Error al obtener la lista de aplicaciones: ${err.message}`)
//         return
//       }

//       // Divide la salida en líneas y filtra las líneas vacías
//       const lines = stdout.split('\n').filter((line) => line.trim() !== '')

//       // Elimina la primera línea, ya que contiene los encabezados de las columnas
//       const data = lines.slice(1).map((line) => {
//         // Divide cada línea en campos separados por dos o más espacios
//         const fields = line.split(/\s{2,}/)
//         return {
//           packageName: fields[0].trim(),
//           version: fields[1].trim(),
//           description: fields[2].trim()
//         }
//       })
//       aplications = data
//     })
//   } else {
//     exec('dpkg -l | grep "^ii"', (err, stdout, stderr) => {
//       if (err) {
//         console.error(`Error al obtener la lista de aplicaciones: ${err.message}`)
//         return
//       }

//       // Divide la salida en líneas y filtra las líneas vacías
//       const lines = stdout
//         .trim()
//         .split('\n')
//         .filter((line) => line.trim() !== '')

//       // Array para almacenar los objetos de las aplicaciones
//       const apps = []

//       // Procesa cada línea para extraer la información
//       lines.forEach((line) => {
//         // Divide la línea en espacios en blanco
//         const parts = line.trim().split(/\s+/)

//         // Extrae la información relevante
//         const packageName = parts[1]
//         const version = parts[2]
//         const description = parts.slice(3).join(' ')

//         // Crea un objeto de aplicación y agrégalo al array
//         const app = {
//           packageName: packageName,
//           version: version,
//           description: description
//         }
//         apps.push(app)
//       })

//       aplications = apps
//     })
//   }
// }

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

    const datasystem = await si.get({
      baseboard: '*', // Información de la placa base
      battery: '*', // Información de la batería
      bios: '*', // Información de la BIOS
      diskLayout: '*', // Información del disco
      memLayout: '*', // Información de la memoria
      cpu: '*', // Información de la CPU
      users: '*', // Información de los usuarios
      graphics: '*', // Información de la tarjeta gráfica
      networkInterfaces: '*', // Información de las interfaces de red
      uuid: '*', // UUID del sistema
      osInfo: '*' // Información del sistema operativo
    })

    // Agregar información adicional
    // systemReport.currentUser = os.userInfo().username
    // alldata.currentUser = os.userInfo().username
    // alldata.processes = null
    // alldata.aplications = aplications
    // alldata.networkInterfaces = await si.networkInterfaces()

    datasystem.currentUser = os.userInfo().username

    return datasystem
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
