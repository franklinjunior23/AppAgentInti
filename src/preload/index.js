import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NameFunction } from '../main/types'

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
  onSystemStats: (callback) => {
    ipcRenderer.on('system-stats', (_event, data) => callback(data))
  },
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update_available', (_, info) => callback(info))
  },
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  startDownload: () => ipcRenderer.send('start_download'),

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

  // HISTORY 

  getHistory: (params = {}) => ipcRenderer.invoke('get-history', params),

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
  },
  removeListenerUpdateAvailable: () => {
    ipcRenderer.removeAllListeners('update_available')
  },
  removeSystemStats: (callback) => ipcRenderer.removeListener('system-stats', callback) // 🧹 Función para limpiar eventos
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
