import { pathFileConfig } from '../contants/name-config'
import fs from 'fs'

// 🔹 Definir el tipo de configuración
interface ConfigData {
  id_device?: string
}

export default class Config {
  private data: ConfigData

  constructor() {
    this.data = { id_device: undefined, }
    this.load()
  }

  private load() {
    try {
      if (fs.existsSync(pathFileConfig)) {
        const dataConfig = fs.readFileSync(pathFileConfig, 'utf-8')
        this.data = JSON.parse(dataConfig) as ConfigData
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
}
