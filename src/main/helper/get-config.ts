import Logger from 'electron-log'
import { pathFileConfig, pathFileDbDevice } from '../contants/name-config'
import fs from 'fs'

// 🔹 Definir el tipo de configuración
interface ConfigData {
  id_device?: string
}

export default class Config {
  private data: ConfigData
  private dataDevice : null | Record <string, any>

  constructor() {
    this.data = { id_device: undefined, }
    this.dataDevice = null
    this.load()
  }

  private load() {
    try {
      if (fs.existsSync(pathFileConfig)) {
        const dataConfig = fs.readFileSync(pathFileConfig, 'utf-8')
        this.data = JSON.parse(dataConfig) as ConfigData
      }

      if(fs.existsSync(pathFileDbDevice)){
        const dataDevice = fs
          .readFileSync(pathFileDbDevice, 'utf-8')
         this.dataDevice = JSON.parse(dataDevice) as Record<string, any>
      }

    } catch (error) {
      console.error('❌ Error al leer el archivo de configuración:', error)
    }
  }

  get(): ConfigData {
    return this.data
  }

  set(data: ConfigData): void {
    this.data = data
    this.save()
  }

  update(newData: Partial<ConfigData>): void {
    this.data = { ...this.data, ...newData }
    this.save()
  }

  private save(): void {
    try {
      fs.writeFileSync(pathFileConfig, JSON.stringify(this.data, null, 2), 'utf-8')
    } catch (error) {
      console.error('❌ Error al guardar el archivo de configuración:', error)
    }
  }

  getDeviceData(): Record<string, any> {
    return this.dataDevice
  }

  setDeviceData(data: Record<string, any>): void {
    this.dataDevice = data
    this.saveDeviceData()
  }

  private saveDeviceData(): void {
    try {
      fs.writeFileSync(pathFileDbDevice, JSON.stringify(this.dataDevice, null, 2), 'utf-8')
    } catch (error) {
     Logger.error('Error al guardar el archivo de configuración:', error?.message)
    }
  }

}
