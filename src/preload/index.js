import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

//funcion para mandar al front la data que se recepciona en ello
contextBridge.exposeInMainWorld('SistemInfo', {
  GetInfoSystem: () =>
    ipcRenderer.on('SystemInfo', (event, data) => {
      return data
    })
})

// funcion para traer el evento SystemInfo y pues imprimir la data segun con lo que se manda desde el main (index.js)
ipcRenderer.on('SystemInfo', (event, data) => {
  window.SystemInfo = data
  console.log(data)
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
