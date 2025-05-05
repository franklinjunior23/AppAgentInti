import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { GET_NOTIFICATION } from '../../contants/name-notifitacion'
import { getNotificationPaginate } from '../../database/query/notification-query'
import { LINK_DEVICE, REFRESH_DEVICE, UNLINK_DEVICE } from '../../contants/name-ipc-on'
import { sendSystemError } from '../../helper/error'
import Config from '../../helper/get-config'
import Logger from 'electron-log'
import { GET_HISTORY } from '../../contants/name-history'
import { CreateHistory, getHistoryPaginate } from '../../database/query/history-query'
import { ConfigurationUser } from '../../../main/contants/config-template'
import fs from 'fs'
import {
  directoryApplication,
  pathChangesFolder,
  pathFileConfig,
  pathFileDbDevice
} from '../../../main/contants/name-config'
import { changesDeviceInit } from '../history/changes'
import { getSoftwareList } from '../../../main/domain/get-software-list'
import 'dotenv/config'

export default function setupIpcHandlers(mainWindows: BrowserWindow, dataDevice): void {
  ipcMain.on(GET_NOTIFICATION, (event: IpcMainEvent, args) => {
    const { limit = 20, offset = 0 } = args
    getNotificationPaginate(event, limit, offset)
  })
  ipcMain.on(LINK_DEVICE, (event: IpcMainEvent, data) => {
    if (!data?.id_device) {
      sendSystemError(event, {
        title: '⚠️ Error de conexión',
        message:
          'No se pudo conectar el usuario porque falta el identificador del dispositivo (id_device). Verifica la configuración e intenta nuevamente.',
        success: false
      })

      Logger.error(
        'No se pudo conectar el usuario porque falta el identificador del dispositivo (id_device). Verifica la configuración e intenta nuevamente.'
      )
      return
    }

    const configData = new Config()
    configData.update({
      id_device: data.id_device
    })

    sendSystemError(event, {
      title: '✅ Conexión exitosa',
      message: 'El dispositivo se ha conectado correctamente.',
      success: true
    })
    CreateHistory({
      description: `El dispositivo se conectó exitosamente a una sucursal del sistema. A partir de este momento, podrá acceder y utilizar todas las funcionalidades asociadas a esta sede.`,
      title: `✅ Vinculación de dispositivo completada`
    })

    Logger.info('Conectando dispositivo correctamente :' + new Date())
  })

  ipcMain.on(UNLINK_DEVICE, (event: IpcMainEvent) => {
    const configData = new Config()
    configData.update({
      id_device: undefined,
      updatedHeartbeat: null
    })

    configData.set({
      id_device: undefined
    })

    sendSystemError(event, {
      title: '✅ Desconexión exitosa',
      message: 'El dispositivo se ha desconectado correctamente.',
      success: true
    })
    CreateHistory({
      description: `El dispositivo se desconectó correctamente del sistema. A partir de ahora, ya no estará vinculado ni podrá interactuar con las funciones disponibles hasta que se vuelva a registrar.`,
      title: `✅ Desvinculación de dispositivo exitosa`
    })

    Logger.info('Desconectando dispositivo :' + new Date())
  })
  ipcMain.on(REFRESH_DEVICE, (event: IpcMainEvent) => {
    sendSystemError(event, {
      title: '⚠️ Accion en proceso',
      message: 'La acción de refrescar el dispositivo aun no esta implementada. ',
      success: true
    })
  })
  ipcMain.handle('get-app-version', () => app.getVersion())

  ipcMain.handle(GET_HISTORY, (event: IpcMainEvent, args) => {
    const { limit = 20, offset = 0 } = args
    const data = getHistoryPaginate(limit, offset)
    return data
  })
  ipcMain.handle('get-config', async () => {
    const config = new Config().get()
    return config
  })

  ipcMain.handle('save-config', async (event, newConfig: ConfigurationUser) => {
    const config = new Config()

    config.update({ ...config.data, ...newConfig })

    return true
  })

  // SOFTWARE LIST
  ipcMain.handle('get-software-list', async () => {
    const softwareList = new Config().dataSoftware
    return softwareList
  })

  ipcMain.handle('delete-list-data', async () => {
    fs.unlink(directoryApplication + '/installed-software.json', (err) => {
      if (err) {
        Logger.error('Error al eliminar el archivo:', err.message)
        return false
      }
      Logger.info('Archivo eliminado correctamente')
    })
    fs.unlink(pathFileDbDevice, (err) => {
      if (err) {
        Logger.error('Error al eliminar el archivo:', err.message)
        return false
      }
      Logger.info('Archivo eliminado correctamente')
    })
    fs.unlink(pathFileConfig, (err) => {
      if (err) {
        Logger.error('Error al eliminar el archivo:', err.message)
        return false
      }
      Logger.info('Archivo eliminado correctamente')
    })

    CreateHistory({
      title: 'Eliminacion de archivo de configuracion',
      description:
        'Se elimino el archivo de configuracion del dispositivo, se recomienda reiniciar la aplicacion para que se genere un nuevo archivo de configuracion.'
    })

    app.isQuitting = true
    app.quit()
  })
  // UPDATE CHANGES

  ipcMain.handle('refresh-changes', async () => {
    changesDeviceInit()
  })

  ipcMain.handle('get-changes-device', async () => {
    return fs.readdirSync(pathChangesFolder)
  })

  ipcMain.handle('read-file-changes', async (event: IpcMainEvent, fileName: string) => {
    const filePath = pathChangesFolder + `/${fileName}`
    if (!fs.existsSync(filePath)) {
      sendSystemError(event, {
        title: '⚠️ Error de lectura',
        message: 'El archivo no existe.',
        success: false
      })
      return null
    }
    try {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data)
    } catch (err) {
      sendSystemError(event, {
        title: '⚠️ Error de lectura',
        message: 'Error al leer el archivo.',
        success: false
      })
      Logger.error('Error al leer el archivo:', err?.message)
      return null
    }
  })

  ipcMain.handle('refresh-software-list', async () => {
    await getSoftwareList() 
    return true
  })

  ipcMain.handle('get-env-variable', (event, key) => {
    return process.env[key] || null;
  });
}
