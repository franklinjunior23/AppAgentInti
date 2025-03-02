import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NameFunction } from '../main/types'

// Custom APIs for renderer
const api = {
  getOs: async () => {
    return await ipcRenderer.invoke(NameFunction.SystemOs)
  }
}

ipcRenderer.on('pong', (event, message) => {
  console.log(message)
})

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
  onErrorSystem : (callback) => ipcRenderer.on('errorSystem', (event, data) => callback(data)),

  // Limpiar los listeners cuando ya no sean necesarios
  removeSystemInfoListener: () => {
    ipcRenderer.removeAllListeners('SystemInfo')
  }
,
  removeErrorSystemListener: () => {
    ipcRenderer.removeAllListeners('errorSystem')
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
