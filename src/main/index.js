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

let tray = null

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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
    cron.schedule('*/5 * * * *', async () => {
      try {
        // Lógica para enviar información a la API
        const response = await axios.post('https://tu-api.com/ruta', {
          // Datos que deseas enviar a la API
        })
        console.log('Información enviada correctamente:', response.data)
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
  console.log('enviando')
  const systemReport = await collectSystemInfo()
  return systemReport
})

// Configuración de autoactualización (electron-updater)
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'franklinjunior23',
  repo: 'AppAgentInti'
})

app.whenReady().then(() => {
  /**
 *
 *   tray.on('click', () => {
    mainWindow.isVisible() ??  mainWindow.show()
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
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      // app.isQuiting = true
      app.quit() // Quit the app when all windows are closed, except on macOS.
    }
  })
})
