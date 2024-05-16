import { app, shell, BrowserWindow, ipcMain, Tray, Menu, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { collectSystemInfo } from './SystemInfo'
import AutoLaunch from 'auto-launch'
import { autoUpdater } from 'electron-updater'
import { NameFunction } from './types'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

let tray = null
let data_device = null
Object.defineProperty(app, 'isPackaged', {
  get() {
    return true
  }
})
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  process.env.APPIMAGE = path.join(
    __dirname,
    'dist',
    `Installar_Mapeo_${app.getVersion()}_linux.AppImage`
  )
}
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'franklinjunior23',
  repo: 'AppAgentInti',
  channel: 'latest', // Especifica el canal de lanzamiento, como "latest" para obtener las últimas versiones
  releaseType: 'release', // Especifica el tipo de lanzamiento, como "release" para obtener lanzamientos oficiales
  host: 'https://github.com', // Especifica el host de GitHub
  private: true, // Indica que el repositorio es privado
  token: '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' // Token de acceso personal para acceder al repositorio privado
})

autoUpdater.checkForUpdatesAndNotify()

async function RequestData() {
  const idDevice = readUserData()?.iddevice
  if (!idDevice) return
  try {
    // Lógica para enviar información a la API
    const response = await axios.post('https://dev.intisoft.com.pe/api/v1/Dispositivos/Agent', {
      IdDipositivo: idDevice,
      data_device
    })
    console.log('Información enviada correctamente:', response.data)
  } catch (error) {
    console.error('Error al enviar información a la API:', error)
  }
}

// Configuración de autoactualización (electron-updater)

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 960,
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

  function ShowMessage(message) {
    mainWindow.webContents.send('message', message)
  }

  // autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  //   console.log('Actualización descargada')
  //   const dialogOpts = {
  //     type: 'info',
  //     buttons: ['Restart', 'Later'],
  //     title: 'Application Update',
  //     message: process.platform === 'win32' ? releaseNotes : releaseName,
  //     detail: 'Una nueva versión ha sido descargada. Restart the application to apply the updates.'
  //   }
  //   console.log('lego')

  //   dialog.showMessageBox(dialogOpts).then((returnValue) => {
  //     if (returnValue.response === 0) autoUpdater.quitAndInstall()
  //   })
  // })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // autoUpdater.checkForUpdates()
    // autoUpdater.on('update-not-available', () => {
    //   ShowMessage('No hay actualizaciones disponibles.')
    // })
    // autoUpdater.on('checking-for-update', () => {
    //   ShowMessage('Buscando actualizaciones...')
    // })
    // autoUpdater.on('update-available', () => {
    //   ShowMessage('Actualización disponible...')
    // })

    collectSystemInfo()
      .then((data) => {
        mainWindow.webContents.send('SystemInfo', [data])
      })
      .catch((error) => {
        console.error('Error al recopilar información del sistema:', error)
      })

    // */10 * * * *
    // 10 minutos de retraso para enviar la data
    // cron.schedule('*/10 * * * *', async () => {
    //   const idDevice = readUserData()?.iddevice
    //   if (!idDevice) return
    //   try {
    //     // Lógica para enviar información a la API
    //     const response = await axios.post('https://dev.intisoft.com.pe/api/v1/Dispositivos/Agent', {
    //       IdDipositivo: idDevice,
    //       data_device
    //     })
    //   } catch (error) {
    //   }
    // })
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
  data_device = systemReport
  return systemReport
})

app.whenReady().then(() => {
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    console.log('Update available.')
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.')
  })

  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater. ' + err)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    console.log('Download progress...')
    // let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    // log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    // console.log(log_message)
  })

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded')
  })

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
  const appDirectory = path.dirname(app.getPath('exe'))

  // Ruta completa para guardar el archivo en el directorio de la aplicación
  const filePath = path.join(appDirectory, 'user-data.json')

  try {
    // Convertir los datos del usuario a formato JSON y guardarlos en el archivo
    fs.writeFileSync(filePath, JSON.stringify({ iddevice: data }))
    console.log('Datos del usuario guardados correctamente.')
  } catch (error) {
    console.error('Error al guardar los datos del usuario:', error)
  }
}

function readUserData() {
  const appDirectory = path.dirname(app.getPath('exe'))

  // Ruta completa del archivo en el directorio de la aplicación
  const filePath = path.join(appDirectory, 'user-data.json')

  try {
    // Leer el contenido del archivo
    const data = fs.readFileSync(filePath, 'utf-8')
    console.log('Contenido del archivo:', data)
    return JSON.parse(data) // Si el archivo contiene datos JSON
  } catch (error) {
    console.error('Error al leer el archivo desde la raíz del sistema:', error)
    return null
  }
}
