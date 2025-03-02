import { app, shell, BrowserWindow, ipcMain } from 'electron'
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
import { API_URL, isDevelopment } from './contants/is-dev'
import { directoryApplication, pathFileConfig } from './contants/name-config'
import { validateDirectory } from './helper/validate-directory'
import { createTray } from './config/tray-menu'
import { getDataDevice } from './crons/get-data-device'

let mainWindow
let dataDevice

let data_device = null
let deviceDataNew = null

const notifyFrontendReply = 'errorSystem'

const gotTheLock = app.requestSingleInstanceLock()

// DESACTIVAR LA ACELERACIÓN DE HARDWARE
app.disableHardwareAcceleration()

// CONFIGURACON PARA AUTO UPDATE

// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true
//   }
// })

if (isDevelopment) {
  process.env.APPIMAGE = path.join(
    __dirname,
    'dist',
    `Installar_Mapeo_${app.getVersion()}_linux.AppImage`
  )
}

validateDirectory(directoryApplication)

function createWindow() {
  // Create the browser window.
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

  getDataDevice(mainWindow)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('conect-user', async (event, data) => {
    try {
      // Validar si los datos contienen un ID de dispositivo válido
      if (!data?.id_device) {
        return event.reply(notifyFrontendReply, {
          success: false,
          title: '⚠️ Error de conexión',
          message: 'El ID del dispositivo es inválido o no está presente.'
        })
      }

      // Guardar los datos en el archivo
      fs.writeFileSync(pathFileConfig, JSON.stringify(data))

      try {
        // Recopilar información del sistema nuevamente
        const systemData = await collectSystemInfo()
        data_device = systemData

        // Enviar la nueva información al frontend
        mainWindow.webContents.send('SystemInfo', systemData)

        // Responder con éxito al frontend
        event.reply(notifyFrontendReply, {
          success: true,
          title: '✅ Usuario conectado',
          message: 'El usuario ha sido conectado correctamente.'
        })
      } catch (error) {
        console.error('Error al recopilar la información inicial del sistema:', error)
        event.reply(notifyFrontendReply, {
          success: false,
          title: '❌ Error al conectar',
          message: 'No se pudo recopilar la información del sistema.'
        })
      }
    } catch (error) {
      console.error('Error al guardar el archivo:', error)
      event.reply(notifyFrontendReply, {
        success: false,
        title: '❌ Error al guardar',
        message: 'No se pudo guardar la información del usuario.'
      })
    }
  })

  ipcMain.on('desvincule-device', async (event) => {
    try {
      let fileData = {}
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf-8')
        fileData = rawData ? JSON.parse(rawData) : {}
      }

      if (!fileData.id_device) {
        return event.reply(notifyFrontendReply, {
          success: false,
          title: '⚠️ Dispositivo no vinculado',
          message: 'El dispositivo ya está desvinculado o no tiene un ID registrado.'
        })
      }

      fs.writeFileSync(filePath, JSON.stringify({ id_device: null }))

      const data = await collectSystemInfo()
      data_device = data

      mainWindow.webContents.send('SystemInfo', data)

      // Responder con éxito al frontend
      event.reply(notifyFrontendReply, {
        success: true,
        title: '✅ Dispositivo desvinculado',
        message: 'El dispositivo se ha desvinculado correctamente.'
      })
    } catch (error) {
      console.error('Error al desvincular el dispositivo:', error)

      // Responder con error al frontend
      event.reply(notifyFrontendReply, {
        success: false,
        title: '❌ Error al desvincular',
        message: error?.message ?? 'Ocurrió un error inesperado al desvincular el dispositivo.'
      })
    }
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

    cron.schedule('*/10 * * * *', async () => {
      try {
        const filedata = fs.readFileSync(pathFileConfig, 'utf-8')
        const data = JSON.parse(filedata)

        if (!data.device_id) return

        console.log('si existe')
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

  // if (!gotTheLock) {
  //   app.quit();
  // } else {
  //   app.on('second-instance', () => {
  //     if (mainWindow) {
  //       if (mainWindow.isMinimized()) mainWindow.restore();
  //       mainWindow.show();
  //       mainWindow.focus();
  //     }
  //   });
  // }
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
