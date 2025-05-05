import fs from 'fs'
import { directoryApplication } from '../contants/name-config'
import { getAllInstalledSoftware } from 'fetch-installed-software'

export async function getSoftwareList() {
  const data = await getAllInstalledSoftware()
  fs.writeFileSync(
    `${directoryApplication}/installed-software.json`,
    JSON.stringify(data, null, 2),
    'utf-8'
  )
}

export async function initGetSoftwareList() {
  if (fs.existsSync(`${directoryApplication}/installed-software.json`)) return

  getSoftwareList()
}
