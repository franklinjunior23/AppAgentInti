import fs from 'fs'
import { pathFileConfig, pathFileDbConfig } from '../contants/name-config'
import Config from './get-config'
import Logger from 'electron-log'

export function validateDirectory(directory: string): void {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })

     Logger.info('Directorio creado correctamente')
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

    if(!fs.existsSync(pathFileDbConfig)){
      fs.writeFileSync(pathFileDbConfig, '', 'utf-8')  
    }

  } catch (error) {
    Logger.error('Error al crear el directorio o archivo:', error?.message)
    throw new Error('Error al crear el directorio o archivo')
  }
}
