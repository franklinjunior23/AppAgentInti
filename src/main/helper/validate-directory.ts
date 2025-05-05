import fs from 'fs'
import {  pathChangesFolder, pathFileConfig, pathFileDbConfig } from '../contants/name-config'
import Config from './get-config'
import Logger from 'electron-log'
import { templateConfigurationUser } from '../contants/config-template'
export async function validateDirectory(directory: string) {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })

      Logger.info('Directorio creado correctamente')
    }
    if(!fs.existsSync(pathChangesFolder)) {
      fs.mkdirSync(pathChangesFolder, { recursive: true })
    }

    if (!fs.existsSync(pathFileConfig)) {
      fs.writeFileSync(pathFileConfig, JSON.stringify(templateConfigurationUser, null, 2), 'utf-8')
    } else {
      const config = new Config()
      const defaultConfig = config.get()

      Object.keys(templateConfigurationUser).forEach((key) => {
        // Si la clave no existe en la configuración actual
        if (!(key in defaultConfig)) {
          // Asigna el valor predeterminado de la plantilla
          defaultConfig[key] = templateConfigurationUser[key]
          Logger.info(`Se agregó la clave "${key}" con su valor predeterminado`)
        }
      })

      // Guarda la configuración actualizada
      config.set(defaultConfig)
    }

    if (!fs.existsSync(pathFileDbConfig)) {
      fs.writeFileSync(pathFileDbConfig, '', 'utf-8')
    }
  } catch (error) {
    Logger.error('Error al crear el directorio o archivo:', error?.message)
    throw new Error('Error al crear el directorio o archivo')
  }
}
