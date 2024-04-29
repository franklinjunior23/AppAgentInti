import { app, shell, BrowserWindow, ipcRenderer, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { collectSystemInfo } from './SystemInfo'
import AutoLaunch from 'auto-launch'
import { autoUpdater } from 'electron-updater'
import { NameFunction } from './types'
import cron from 'node-cron'
import axios from 'axios'
import fs from 'fs'

let tray = null

// configs
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 580,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
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

  mainWindow.webContents.on('did-finish-load', () => {
    collectSystemInfo()
      .then((data) => {
        mainWindow.webContents.send('SystemInfo', [data])
      })
      .catch((error) => {
        console.error('Error al recopilar información del sistema:', error)
      })

    // */10 * * * *
    // 10 minutos de retraso para enviar la data
    cron.schedule('*/5 * * * * *', async () => {
      const idDevice = readUserData()?.iddevice
      const systemReport = await collectSystemInfo()
      if (!idDevice) return
      try {
        // Lógica para enviar información a la API
        const response = await axios.post('https://dev.intisoft.com.pe/api/v1/Dispositivos/Agent', {
          IdDipositivo: idDevice,
          ...systemReport
        })
        console.log('Información enviada correctamente:', response)
      } catch (error) {
        console.error('Error al enviar información a la API:', error)
      }
    })
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir Aplicacion',
      type: 'normal',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: 'Ocultar Aplicacion',
      type: 'normal',
      click: () => {
        mainWindow.hide()
      }
    },
    {
      label: 'Recargar Aplicacion',
      type: 'normal',
      click: () => {
        mainWindow.reload()
      }
    },
    {
      label: 'AutoInicio',
      type: 'checkbox',
      checked: app.getLoginItemSettings().openAtLogin,
      click: () => {
        const settings = app.getLoginItemSettings()
        app.setLoginItemSettings({
          openAtLogin: !settings.openAtLogin,
          path: app.getPath('exe')
        })
      }
    },
    {
      label: 'Cerrar Aplicacion',
      type: 'normal',
      click: () => {
        app.isQuitting = true // Marcar que la aplicación está cerrando
        app.quit()
      }
    }
  ])
  tray.setToolTip('AgentInventory')
  tray.setContextMenu(contextMenu)

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault()
      mainWindow.hide()
    }
  })
}
// Configuración de autoinicio (AutoLaunch)
const appLauncher = new AutoLaunch({
  name: 'agentinventoy',
  isHidden: true // Mantener oculta la ventana principal
})

ipcMain.handle(NameFunction.SystemOs, async () => {
  const systemReport = await collectSystemInfo()
  return systemReport
})

// Configuración de autoactualización (electron-updater)
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'franklinjunior23',
  repo: 'AppAgentInti',
  releaseType: 'release',
  host: 'github.com',
  private: true,
  token: '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'
})

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('device-data', StorageDevice)

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  autoUpdater.checkForUpdates()

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      // app.isQuiting = true
      app.quit() // Quit the app when all windows are closed, except on macOS.
    }
  })
})

process.on('uncaughtException', function (error) {
  console.error('uncaughtException', error)
})

export function StorageDevice(event, data) {
  const userDataPath = app.getPath('userData')
  const filePath = `${userDataPath}/user-data.json`

  try {
    // Convertir los datos del usuario a formato JSON y guardarlos en el archivo
    fs.writeFileSync(filePath, JSON.stringify({ iddevice: data }))
    console.log('Datos del usuario guardados correctamente.')
  } catch (error) {
    console.error('Error al guardar los datos del usuario:', error)
  }
}
function readUserData() {
  const userDataPath = app.getPath('userData')
  const filePath = `${userDataPath}/user-data.json`

  try {
    // Leer el contenido del archivo
    const data = fs.readFileSync(filePath, 'utf-8')
    // Parsear el contenido como un objeto JSON
    const userData = JSON.parse(data)
    console.log('Datos del usuario leídos correctamente:', userData)
    return userData
  } catch (error) {
    console.log(error.message, 'Error al leer los datos del usuario.')
    return null
  }
}
