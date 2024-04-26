import { app, shell, BrowserWindow, ipcRenderer, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { collectSystemInfo } from './SystemInfo'
import AutoLaunch from 'auto-launch'
import { autoUpdater } from 'electron-updater'
import { NameFunction } from './types'

let mainWindow
let tray = null

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
  })

  /**
  *  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  }
  *
  */

  // HMR for renderer based on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.handle(NameFunction.SystemOs, async () => {
  const systemReport = await collectSystemInfo()
  return systemReport
})

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
setInterval(() => {
  console.log('Checking for updates...')
}, 2000)

app.whenReady().then(() => {
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir Aplicacion',
      type: 'normal',
      click: () => {
        try {
          app.isQuiting = false
          
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      label: 'Ocultar Aplicacion',
      type: 'normal',
      click: () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      }
    },
    { label: 'Cerrar Aplicacion', type: 'normal', click: () => app.quit() }
  ])
  tray.setToolTip('AgentInventory')
  tray.setContextMenu(contextMenu)
  /**
 *
 *   tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
 */

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      console.log('Cerrando Aplicacion')
      app.isQuiting = true

      //  app.quit() //Cerrar la aplicacion
    }
  })
})
