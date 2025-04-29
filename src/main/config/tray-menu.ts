import { Tray, Menu, app } from 'electron'

let tray = null

export function createTray(mainWindow, icon) {
  if (tray) return 

  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir Aplicación',
      type: 'normal',
      click: () => mainWindow.show()
    },
    {
      label: 'Ocultar Aplicación',
      type: 'normal',
      click: () => mainWindow.hide()
    },
    {
      label: 'Recargar Aplicación',
      type: 'normal',
      click: () => mainWindow.reload()
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
      label: 'Cerrar Aplicación',
      type: 'normal',
      click: () => {
        app.isQuitting = true
        app.quit()
      }
    }
  ])

  tray.setToolTip('agente intisoft')
  tray.setContextMenu(contextMenu)
}
