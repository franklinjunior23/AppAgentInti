import { BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
export default class IndexAplication {
  createWindow() {
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
  }
}
