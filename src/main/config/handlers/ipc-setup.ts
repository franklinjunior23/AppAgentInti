import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { GET_NOTIFICATION } from '../../contants/name-notifitacion'
import { getNotificationPaginate } from '../../database/query/notification-query'
import { LINK_DEVICE, REFRESH_DEVICE, UNLINK_DEVICE } from '../../contants/name-ipc-on'
import { sendSystemError } from '../../helper/error'
import Config from '../../helper/get-config'

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
  })

  ipcMain.on(UNLINK_DEVICE, (event: IpcMainEvent) => {
    const configData = new Config()
    configData.update({
      id_device: undefined
    })

    sendSystemError(event, {
      title: '✅ Desconexión exitosa',
      message: 'El dispositivo se ha desconectado correctamente.',
      success: true
    })
    mainWindows.webContents.send(sendDataDevice, {
      ...dataDevice,
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
}
