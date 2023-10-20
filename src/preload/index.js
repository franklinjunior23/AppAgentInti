import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

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
  }
})

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.log('error : 26 preload')
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
