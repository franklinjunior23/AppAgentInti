import fs from 'fs'
import { pathFileConfig } from '../contants/name-config'
import Config from './get-config'

export function validateDirectory(directory: string): void {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })

      console.log(`📁 Directorio creado: ${directory}`)
    }

    if (!fs.existsSync(pathFileConfig)) {
      fs.writeFileSync(
        pathFileConfig,
        JSON.stringify(
          {
            id_device: undefined
          },
          null,
          2
        ),
        'utf-8'
      )
    } else {
      const config = new Config()
      if (!config.get()?.id_device) {
        config.set({ id_device: undefined })
      }
    }
  } catch (error) {
    console.error('❌ Error al crear el directorio o archivo:', error)
    throw new Error('Error al crear el directorio o archivo')
  }
}
