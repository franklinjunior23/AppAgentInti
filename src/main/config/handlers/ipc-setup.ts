import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { GET_NOTIFICATION } from '../../contants/name-notifitacion'
import { getNotificationPaginate } from '../../database/query/notification-query'
import { LINK_DEVICE, REFRESH_DEVICE, UNLINK_DEVICE } from '../../contants/name-ipc-on'
import { sendSystemError } from '../../helper/error'
import Config from '../../helper/get-config'
import Logger from 'electron-log'
import { GET_HISTORY } from '../../contants/name-history'
import { getHistoryPaginate } from '../../database/query/history-query'

const sendDataDevice = 'SystemInfo'

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

    mainWindows.webContents.send(sendDataDevice, {
      ...dataDevice,
      id_device: data.id_device
    })

    sendSystemError(event, {
      title: '✅ Conexión exitosa',
      message: 'El dispositivo se ha conectado correctamente.',
      success: true
    })

    Logger.info('Conectando dispositivo correctamente')
  })

  ipcMain.on(UNLINK_DEVICE, (event: IpcMainEvent) => {
    const configData = new Config()

    const data = new Config().getDeviceData()
    configData.update({
      id_device: undefined
    })

    sendSystemError(event, {
      title: '✅ Desconexión exitosa',
      message: 'El dispositivo se ha desconectado correctamente.',
      success: true
    })

    Logger.info('Desconectando dispositivo')
    mainWindows.webContents.send(sendDataDevice, {
      ...data,
      id_device: undefined
    })
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
}
