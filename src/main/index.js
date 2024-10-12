import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  dialog,
  Notification,
  session
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { collectSystemInfo } from './SystemInfo'
import AutoLaunch from 'auto-launch'
import { NameFunction } from './types'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import cron from 'node-cron'

let tray = null
let data_device = null
let deviceDataNew = null
let api_url = 'https://dev.intisoft.com.pe/api/v1'

app.relaunch = true

// CONFIGURACON PARA AUTO UPDATE

Object.defineProperty(app, 'isPackaged', {
  get() {
    return true
  }
})
app.disableHardwareAcceleration()
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  api_url = 'http://localhost:3000/api/v1'
  process.env.APPIMAGE = path.join(
    __dirname,
    'dist',
    `Installar_Mapeo_${app.getVersion()}_linux.AppImage`
  )
}

const programDataPath = process.platform === 'win32' 
? path.join(process.env['ProgramData'], 'agente-intisoft') 
: app.getPath('appData');  // Para otros sistemas operativos

// Asegúrate de que el directorio exista, si no, créalo
if (!fs.existsSync(programDataPath)) {
  fs.mkdirSync(programDataPath, { recursive: true });  // Crea los directorios de manera recursiva
}

// Crear la ruta completa del archivo en ProgramData
const filePath = path.join(programDataPath, 'configUserConfig.json');

console.log('Ruta del archivo:', filePath)
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 500,
    show: false,
    resizable: false,
    center: true,
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

  // 10 segundos para traer la data

  cron.schedule('*/10 * * * * ', async () => {
    collectSystemInfo()
      .then((data) => {
        data_device = data
        console.log('enviando')
        mainWindow.webContents.send('SystemInfo', data)
      })
      .catch((error) => {
        console.error('Error al recopilar información del sistema:', error)
      })
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('conect-user', async (event, data) => {
    try {
     fs.writeFileSync(filePath, JSON.stringify(data))

      collectSystemInfo()
        .then((data) => {
          data_device = data
          mainWindow.webContents.send('SystemInfo', data)
        })
        .catch((error) => {
          console.error('Error al recopilar la información inicial del sistema:', error)
        })
    } catch (error) {
      console.log('Error al guardar el archivo:', error)
    }
  })
  ipcMain.on('desvincule-device',  (event) => {
    try {
       fs.writeFileSync(
        filePath,
        JSON.stringify({
          id_device: null
        })
      )
      collectSystemInfo()
        .then((data) => {
          data_device = data
          mainWindow.webContents.send('SystemInfo', data)
        })
        .catch((error) => {
          console.error('Error al recopilar la información inicial del sistema:', error)
        })
    } catch (error) {
      console.log('Error al desvincular el dispositivo:', error)
    }
  })

  ipcMain.on('refresh-data', async (event) => {
    console.log(api_url, data_device.id_device)
    const param = await axios.patch(`${api_url}/device/${data_device.id_device}`, {
      name: data_device.osInfo.hostname
    })
    console.log(param.data)
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

    cron.schedule('*/10 * * * *', async () => {
      try {
        const filedata = fs.readFileSync(filePath, 'utf-8')
        const data = JSON.parse(filedata)

        if (!data.device_id) return

        console.log('si existr')
      } catch (error) {
        console.log('No existe el archivo')
      }
    })
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
  // Iniciar la aplicación en segundo plano
  createWindow()
  // session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
  //   // Agrega la cabecera 'Origin' para las solicitudes salientes
  //   details.requestHeaders['Origin'] = 'http://localhost:3005'

  //   // Asegúrate de permitir todas las cabeceras necesarias
  //   details.requestHeaders['Access-Control-Allow-Origin'] = 'http://localhost:3005'
  //   details.requestHeaders['Access-Control-Allow-Credentials'] = 'true'

  //   callback({ requestHeaders: details.requestHeaders })
  // })

  // Configurar el autoinicio de la aplicación
  electronApp.setAppUserModelId('com.intiscorp.agentinventory')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('device-data', StorageDevice)

  // Evento para recibir datos del dispositivo

  ipcMain.on('ping', () => console.log('pong'))

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
