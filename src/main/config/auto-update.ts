import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'

export class Updater {
  private mainWindows: BrowserWindow

  constructor(
    private directoryApplication: string,
    mainWindows: BrowserWindow
  ) {
    this.setupLogger()
    this.setupUpdater()
    this.mainWindows = mainWindows
  }

  private setupLogger() {
    log.transports.file.resolvePath = () => join(this.directoryApplication, './log.txt')
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.forceDevUpdateConfig = true
  }

  private setupUpdater() {
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'franklinjunior23',
      repo: 'AppAgentInti',
      vPrefixedTagName: true,
      private: false
    })

    autoUpdater.autoDownload = false // 🔹 No descargar automáticamente
    autoUpdater.autoInstallOnAppQuit = false

    autoUpdater.on('update-available', (info) => {
      this.mainWindows.webContents.send('update_available', info)
    })

    autoUpdater.on('checking-for-update', () => {})

    autoUpdater.on('update-available', (info) => {})

    autoUpdater.on('update-not-available', () => {})

    autoUpdater.on('error', (err) => {
      console.log(err)
      log.error(`Error en autoUpdater: ${err}`)
    })

    autoUpdater.on('download-progress', (progressObj) => {
      const percent = Math.floor(progressObj.percent) // redondeamos para la barra
      this.mainWindows.webContents.send('update_download_progress', percent)
    })

    autoUpdater.on('update-downloaded', () => {
      log.info(`Actualización descargada. - ${new Date()}`)
      // autoUpdater.quitAndInstall()
    })

    ipcMain.on('start_install_update', () => {
      autoUpdater.quitAndInstall()
      app.isQuitting = true
      app.quit()
      
    })

    ipcMain.on('start_download', () => {
      autoUpdater.downloadUpdate()
    })
  }

  public checkForUpdates() {
    autoUpdater.checkForUpdates()
  }
}
