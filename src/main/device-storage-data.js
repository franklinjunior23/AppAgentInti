import { app } from 'electron/main'
import fs from 'fs'

export function StorageDevice(event, data) {
  const userDataPath = app.getPath('userData')
  const filePath = `${userDataPath}/user-data.json`

  try {
    // Convertir los datos del usuario a formato JSON y guardarlos en el archivo
    fs.writeFileSync(filePath, JSON.stringify({ iddevice: data }))
    console.log('Datos del usuario guardados correctamente.')
  } catch (error) {
    console.error('Error al guardar los datos del usuario:', error)
  }
}
