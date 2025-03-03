import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { collectSystemInfo } from './SystemInfo'
import AutoLaunch from 'auto-launch'
import { NameFunction } from './types'
import axios from 'axios'
import path from 'path'
import { API_URL, isDevelopment } from './contants/is-dev'
import { directoryApplication } from './contants/name-config'
import { validateDirectory } from './helper/validate-directory'
import { createTray } from './config/tray-menu'
import { getDataDevice } from './crons/get-data-device'
import { Initialiti } from './database/initialiti'
import setupIpcHandlers from './config/handlers/ipc-setup'

let mainWindow
let dataConfiguration

let data_device = null

const notifyFrontendReply = 'errorSystem'

const gotTheLock = app.requestSingleInstanceLock()

// DESACTIVAR LA ACELERACIÓN DE HARDWARE
app.disableHardwareAcceleration()
Initialiti()

if (isDevelopment) {
  process.env.APPIMAGE = path.join(
    __dirname,
    'dist',
    `Installar_Mapeo_${app.getVersion()}_linux.AppImage`
  )
}

validateDirectory(directoryApplication)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 500,
    show: false,
    resizable: false,
    center: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  getDataDevice(mainWindow, data_device)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('refresh-data', async (event) => {
    console.log(api_url, data_device.id_device)
    try {
      const { data } = await axios.patch(`${API_URL}/device/${data_device.id_device}`, {
        name: data_device.osInfo.hostname
      })
      event.reply(notifyFrontendReply, {
        success: true,
        title: '✅ Dispositivo actualizado',
        message: data?.message ?? 'El dispositivo se ha actualizado correctamente.'
      })
    } catch (error) {
      event.reply(notifyFrontendReply, {
        success: false,
        title: 'Error en la actualización del dispositivo',
        message: `
          ❌ Error en la actualización del dispositivo ❌
          -----------------------------------------------
          🛑 Mensaje: ${error?.message || 'No disponible'}
          🛑 Respuesta del servidor: ${error?.response?.data?.message || 'No disponible'}
          🛑 Tipo de error: ${error?.response?.data?.error || 'No disponible'}
          
          🌍 URL: ${API_URL}/device/${data_device.id_device}
          🔍 ID del dispositivo: ${data_device.id_device}
        `.trim()
      })
    }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    collectSystemInfo()
      .then((data) => {
        data_device = data
        mainWindow.webContents.send('SystemInfo', data)
      })
      .catch((error) => {
        console.error('Error al recopilar la información inicial del sistema:', error)
      })
  })

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  createTray(mainWindow, icon)

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault()
      mainWindow.hide()
    }
  })
}
// Configuración de autoinicio (AutoLaunch)
const appLauncher = new AutoLaunch({
  name: 'agente inventory',
  isHidden: true
})

ipcMain.handle(NameFunction.SystemOs, async () => {
  const systemReport = await collectSystemInfo()
  data_device = systemReport
  return systemReport
})

app.whenReady().then(() => {
  createWindow()

  if (!isDevelopment) {
    appLauncher.isEnabled().then((isEnabled) => {
      if (!isEnabled) {
        appLauncher.enable()
      }
    })
  }

  setupIpcHandlers(mainWindow,data_device)

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.show()
        mainWindow.focus()
      }
    })
  }

  electronApp.setAppUserModelId('com.intiscorp.agentinventory')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      // app.isQuiting = true
      app.quit() // Quit the app when all windows are closed, except on macOS.
    }
  })
})
