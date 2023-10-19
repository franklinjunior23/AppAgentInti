import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

ipcRenderer.on('SystemInfo', (event, data) => {
  console.log(data)
})
contextBridge.exposeInMainWorld('systemAPI', {
  getInfo: () => {
    return new Promise((resolve) => {
      // Esperar 5 segundos antes de devolver la información del sistema
      setTimeout(() => {
        ipcRenderer.once('SystemInfo', (event, systemReport) => {
          resolve(systemReport)
        })
        ipcRenderer.send('SystemInfo')
      }, 5000)
    })
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
