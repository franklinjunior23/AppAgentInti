import Config from '../../helper/get-config'
import si from 'systeminformation'
import fs from 'fs'
import Logger from 'electron-log'
import { DateForday, dateForPeru, getDateFilename } from '../../../main/helper/date'
import { pathChangesFolder } from '../../../main/contants/name-config'
import path from 'path'
import { DataDevice } from '../../../main/contants/data'
import { Notification } from 'electron'


export async function changesCpu() {
  const dataDevice = new Config().dataDevice
  const { cpu } = dataDevice
  const dataCpuNew = await si.cpu()

  if (dataCpuNew.brand === cpu.brand) return

  // Comparando más campos
  if (dataCpuNew.brand !== cpu.brand)
    return {
      name: 'cpu',
      previous: cpu,
      current: dataCpuNew
    }
}

export async function changesOsInfo() {
  const dataDevice = new Config().dataDevice

  const { osInfo: previousOsInfo } = dataDevice
  const currentOsInfo = await si.osInfo()

  // Comparando campos específicos del sistema operativo
  if (
    previousOsInfo.distro === currentOsInfo.distro &&
    previousOsInfo.arch === currentOsInfo.arch &&
    previousOsInfo.serial === currentOsInfo.serial
  ) {
    // Si no hay cambios, simplemente retornamos
    return
  }

  // Si hubo un cambio, podemos devolver el nuevo objeto de osInfo
  return {
    name: 'os',
    previous: previousOsInfo,
    current: currentOsInfo
  }
}

export async function changesBaseboard() {
  const dataDevice = new Config().dataDevice

  const { baseboard } = dataDevice

  const dataBaseboardNew = await si.baseboard()

  if (dataBaseboardNew.serial === baseboard.serial) return

  return {
    name: 'motherboard',
    previous: baseboard,
    current: dataBaseboardNew
  }
}

export async function diskHardChanges() {
  const dataDevice = new Config().dataDevice

  const previous = dataDevice
  const previousDisks = previous.diskLayout
  const currentDisks = await si.diskLayout()

  const current = {
    diskLayout: currentDisks
  }

  const newDisks = currentDisks.filter(
    (current) => !previousDisks.some((prev) => prev.serialNum === current.serialNum)
  )

  const removedDisks = previousDisks.filter(
    (prev) => !currentDisks.some((current) => current.serialNum === prev.serialNum)
  )

  if (newDisks.length === 0 && removedDisks.length === 0) return

  const updatedDisks = currentDisks
    .map((current) => {
      const match = previousDisks.find((prev) => prev.serialNum === current.serialNum)
      if (!match) return null
      const changed =
        match.size !== current.size || match.type !== current.type || match.name !== current.name
      return changed ? { previous: match, current } : null
    })
    .filter(Boolean)

  return {
    name: 'storage',
    previous,
    current,
    changes: {
      newDisks,
      removedDisks,
      updatedDisks
    }
  }
}

export async function changesGraphics() {
  const dataDevice = new Config().dataDevice

  const previous = dataDevice.graphics
  const current = await si.graphics()

  const previousControllers = previous.controllers || []
  const currentControllers = current.controllers || []

  // Map para facilitar comparación por modelo
  const previousControllersMap = new Map(previousControllers.map((ctrl) => [ctrl.model, ctrl]))
  const currentControllersMap = new Map(currentControllers.map((ctrl) => [ctrl.model, ctrl]))

  // Nuevas tarjetas gráficas
  const newGraphics = currentControllers.filter((ctrl) => !previousControllersMap.has(ctrl.model))

  // Tarjetas eliminadas
  const removedGraphics = previousControllers.filter(
    (ctrl) => !currentControllersMap.has(ctrl.model)
  )

  if (newGraphics.length === 0 && removedGraphics.length === 0) return

  // Tarjetas modificadas
  const updatedGraphics = currentControllers
    .map((currentCtrl) => {
      const prevCtrl = previousControllersMap.get(currentCtrl.model)
      if (!prevCtrl) return null

      const changed = prevCtrl.vram !== currentCtrl.vram || prevCtrl.bus !== currentCtrl.bus

      return changed ? { previous: prevCtrl, current: currentCtrl } : null
    })
    .filter(Boolean)

  return {
    name: 'graphics',
    previous,
    current,
    changes: {
      newGraphics,
      removedGraphics,
      updatedGraphics
    }
  }
}

// export async function changesDisplays() {
//   const {
//     graphics: { displays : previousDisplays }
//   } = dataDevice
//   const currentDisplays = await (await si.graphics()).displays

//   // Si no hay información de displays previos, devolvemos la nueva información
//   if (!previousDisplays || previousDisplays.length === 0) {
//     return { newDisplays: currentDisplays }
//   }

//   // Comparando los displays para detectar cambios
//   const newDisplays = currentDisplays.filter(
//     (current) => !previousDisplays.some((prev) => prev.device === current.device)
//   )

//   const removedDisplays = previousDisplays.filter(
//     (prev) => !currentDisplays.some((current) => current.device === prev.device)
//   )

//   const updatedDisplays = currentDisplays.filter((current) => {
//     const match = previousDisplays.find((prev) => prev.device === current.device)
//     if (!match) return false
//     return (
//       match.resolution !== current.resolution ||
//       match.size !== current.size ||
//       match.model !== current.model ||
//       match.vendor !== current.vendor // Puedes agregar más campos si es necesario
//     )
//   })

//   return {
//     newDisplays,
//     removedDisplays,
//     updatedDisplays
//   }
// }

export async function changesMemory() {
  const dataDevice = new Config().dataDevice

  const previous = dataDevice
  const current = await si.memLayout()

  const previousModules = previous.memLayout || []
  const currentModules = current || []

  // Map por `serialNum`, ya que es un identificador único en la mayoría de casos
  const previousMap = new Map(previousModules.map((mod) => [mod.serialNum || mod.size || mod.type, mod]))
  const currentMap = new Map(currentModules.map((mod) => [mod.serialNum || mod.size || mod.type, mod]))

  // Nuevos módulos
  const newMemory = currentModules.filter((mod) => !previousMap.has(mod.serialNum))

  // Módulos eliminados
  const removedMemory = previousModules.filter((mod) => !currentMap.has(mod.serialNum))

  if (newMemory.length === 0 && removedMemory.length === 0) return
  // Si no hay cambios, simplemente retornamos

  // Módulos modificados (misma serial pero distinto tamaño, tipo o velocidad)
  const updatedMemory = currentModules
    .map((mod) => {
      const prev = previousMap.get(mod.serialNum)
      if (!prev) return null

      const changed =
        prev.size !== mod.size || prev.type !== mod.type || prev.clockSpeed !== mod.clockSpeed

      return changed ? { previous: prev, current: mod } : null
    })
    .filter(Boolean)

    console.log({
      newMemory,
      removedMemory,
      updatedMemory
    })

  return {
    name: 'ram',
    previous: previousModules,
    current: currentModules,
    changes: {
      newMemory,
      removedMemory,
      updatedMemory
    }
  }
  
}

/**
 * MOTHERBOARD  {serial}
 * CPU  {brand}
 * OS  {distro, arch, serial}
 * RAM {serialNum , size , type}
 *
 */
export async function changesDeviceInit() {
  let changes = []
  new Config().set({
    updatedChangesAt: dateForPeru()
  })

  const checks = await Promise.all([
    changesCpu(),
    changesOsInfo(),
    changesBaseboard(),
    changesMemory(),
    changesGraphics(),
    diskHardChanges()
  ])
  for (const result of checks) {
    if (result?.previous) {
      changes = [
        ...changes,
        {
          [result?.name]: {
            previous: result?.previous,
            current: result?.current,
            ...(result && 'changes' in result ? { changes: result.changes } : {})
          }
        }
      ]
    }
  }

  if (changes.length === 0) {
    new Notification({
      title: 'Sin cambios detectados',
      body: 'No se han detectado cambios en el dispositivo.'
    }).show()
    return
  }

  const nameFile = getDateFilename()
  const filePath = path.join(pathChangesFolder, nameFile)

  new Notification({
    title: 'Cambios detectados',
    body: `Se han detectado cambios en el dispositivo. ${changes.map((change) => change.name).join(', ')}`
  }).show()

  try {
    let existingChanges = []

    // Si ya existe el archivo, leer el contenido actual
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8')
      existingChanges = JSON.parse(raw)
    }

    // Agregar nuevos cambios a los existentes
    const updatedChanges = [...existingChanges, ...changes]

    fs.writeFileSync(filePath, JSON.stringify(updatedChanges, null, 2), 'utf-8')

    await updateDeviceDataFromChanges(changes)

    Logger.info(`Cambios actualizados: ${DateForday()} / ${filePath}`)
  } catch (err) {
    Logger.error('Error al guardar el archivo de cambios:', err)
  }
}

enum NameComponents {
  cpu = 'cpu',
  os = 'os',
  motherboard = 'motherboard',
  ram = 'ram',
  graphics = 'graphics',
  storage = 'storage'
}

export async function updateDeviceDataFromChanges(changes) {
  const currentData = new Config().getDeviceData()

  const parsedFields = {
    [NameComponents.cpu]: 'cpu',
    [NameComponents.os]: 'osInfo',
    [NameComponents.motherboard]: 'baseboard',
    [NameComponents.ram]: 'memLayout',
    [NameComponents.graphics]: 'graphics.displays',
    [NameComponents.storage]: 'diskLayout'
  }

  for (const change of changes) {
    const componentKey = Object.keys(change)[0] as keyof typeof NameComponents
    const currentValue = change[componentKey]?.current
    const path = parsedFields[componentKey]

    if (!currentValue || !path) continue

    const parts = path.split('.')

    if (parts.length === 1) {
      currentData[parts[0]] = currentValue
    } else if (parts.length === 2) {
      // Soporta nested como graphics.displays
      if (!currentData[parts[0]]) currentData[parts[0]] = {}
      currentData[parts[0]][parts[1]] = currentValue
    }
  }

  new Config().setDeviceData(currentData as DataDevice)
}
