import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { collectSystemInfo } from './SystemInfo'
import AutoLaunch from 'auto-launch'
import { autoUpdater } from 'electron-updater'

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
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
  mainWindow.on('closed', () => {
    mainWindow.hide() // Establecer la referencia a null
  })
}

// Configuración de autoinicio (AutoLaunch)
const appLauncher = new AutoLaunch({
  name: 'agentinventoy',
  isHidden: true // Mantener oculta la ventana principal
})

// Configuración de autoactualización (electron-updater)
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'franklinjunior23',
  repo: 'AppAgentInti'
})

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  // No cierres la aplicación, solo oculta la ventana
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      if (mainWindow) {
        mainWindow.hide()
      }
    }
  })

  // Configuración de autoinicio
  appLauncher
    .isEnabled()
    .then((isEnabled) => {
      if (!isEnabled) {
        // Habilitar autoinicio si está deshabilitado
        appLauncher.enable()
      }
    })
    .catch((err) => {
      console.error('Error al verificar el estado de autoinicio:', err)
    })

  // Comprobar actualizaciones automáticamente al iniciar la aplicación
  autoUpdater.checkForUpdates()

  // Crear la ventana principal
  createWindow()
  app.on('activate', () => {
    // Muestra la ventana cuando se activa la aplicación
    if (mainWindow === null) {
      createWindow()
    } else {
      mainWindow.show()
    }
  })
})
