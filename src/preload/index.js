import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NameFunction } from '../main/types'
import { GET_NOTIFICATION } from '../main/contants/name-notifitacion'

// Custom APIs for renderer
const api = {
  getOs: async () => {
    return await ipcRenderer.invoke(NameFunction.SystemOs)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

//funcion para mandar al front la data que se recepciona en ello

contextBridge.exposeInMainWorld('systemAPI', {
  getInfo: () => {
    return new Promise((resolve) => {
      // Escuchar el evento 'system-info' enviado desde el proceso principal
      ipcRenderer.once('SystemInfo', (event, systemReport) => {
        resolve(systemReport)
      })
    })
  },
  // Nuevo método para escuchar eventos periódicos
  // Escuchar el evento 'SystemInfo' para recibir la información del sistema
  onSystemInfo: (callback) => {
    ipcRenderer.on('SystemInfo', (event, data) => callback(data))
  },
  sendSignDevice: (data) => ipcRenderer.send('conect-user', data),
  refreshData: () => ipcRenderer.send('refresh-data'),
  removeIdDevice: () => ipcRenderer.send('desvincule-device'),
  onErrorSystem: (callback) => ipcRenderer.on('errorSystem', (event, data) => callback(data)),

  // NOTIFICATION
  getNotifications: (params) => ipcRenderer.send('get-notifications', params),
  onNotificationsReply: (callback) =>
    ipcRenderer.on('get-notifications-reply', (event, response) => callback(response)),

  // Para recibir notificaciones en tiempo real
  onNewNotification: (callback) =>
    ipcRenderer.on('new-notification', (event, notification) => callback(notification)),


  
  // Limpiar los listeners cuando ya no sean necesarios
  removeSystemInfoListener: () => {
    ipcRenderer.removeAllListeners('SystemInfo')
  },
  removeErrorSystemListener: () => {
    ipcRenderer.removeAllListeners('errorSystem')
  },
  removeListenersNotifications: () => {
    ipcRenderer.removeAllListeners('get-notifications-reply')
    ipcRenderer.removeAllListeners('new-notification')
  }
})

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
