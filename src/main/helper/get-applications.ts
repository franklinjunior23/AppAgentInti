import WinReg from 'winreg'

async function getInstalledProgramsWinReg() {
  const regKey64 = new WinReg({
    hive: WinReg.HKLM,
    key: '\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\'
  })

  const regKey32 = new WinReg({
    hive: WinReg.HKLM,
    key: '\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\'
  })

  const installedApps: string[] = []

  for (const regKey of [regKey64, regKey32]) {
    regKey.values((err, items) => {
      if (err) console.error('❌ Error leyendo el Registro:', err)
      else {
        items.forEach((item) => {
          if (item.name === 'DisplayName') {
            installedApps.push(item.value)
          }
        })
        console.log('✅ Aplicaciones instaladas:', installedApps)
      }
    })
  }
}

export default getInstalledProgramsWinReg
