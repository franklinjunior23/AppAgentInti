import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

ipcRenderer.on('SystemInfo', (event, data) => {
  window.SystemInfo = data
  console.log(data)
})
contextBridge.exposeInMainWorld('SistemInfo', {
  GetInfoSystem: () => {
    return ipcRenderer.send('SystemInfo')
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
