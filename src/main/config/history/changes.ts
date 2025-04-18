import Config from '../../helper/get-config'
import si from 'systeminformation'

const dataDevice = new Config().dataDevice

const changesDevice = null

export async function changesCpu() {
  const { cpu } = dataDevice
  const dataCpuNew = await si.cpu()

  // Comparando más campos
  if (
    dataCpuNew.brand === cpu.brand &&
    dataCpuNew.speed === cpu.speed &&
    dataCpuNew.cores === cpu.cores
  )
    return
}

export async function changesOsInfo() {
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
    previousOsInfo,
    currentOsInfo
  }
}

export async function changesBaseboard() {
  const { baseboard } = dataDevice

  const dataBaseboardNew = await si.baseboard()

  if (dataBaseboardNew.serial === baseboard.serial) return

  console.log('Baseboard changed:', {
    previous: baseboard,
    current: dataBaseboardNew
  })
}

export async function diskHardChanges() {
  const { diskLayout: previousDisks } = dataDevice
  const currentDisks = await si.diskLayout()

  // Discos nuevos (no estaban antes)
  const newDisks = currentDisks.filter(
    (current) => !previousDisks.some((prev) => prev.serialNum === current.serialNum)
  )

  // Discos desconectados (ya no están)
  const removedDisks = previousDisks.filter(
    (prev) => !currentDisks.some((current) => current.serialNum === prev.serialNum)
  )

  // Discos modificados (mismo serial pero diferente modelo, tamaño o tipo)
  const updatedDisks = currentDisks.filter((current) => {
    const match = previousDisks.find((prev) => prev.serialNum === current.serialNum)
    if (!match) return false
    return (
      match.size !== current.size || match.type !== current.type || match.name !== current.name // puedes agregar más campos según lo que quieras comparar
    )
  })

  return {
    newDisks,
    removedDisks,
    updatedDisks
  }
}

export async function changesGraphics() {
  const { graphics: previousGraphics } = dataDevice
  const currentGraphics = await si.graphics()

  const previousControllers = previousGraphics.controllers || []
  const currentControllers = currentGraphics.controllers || []

  // Usar un Map para comparar de manera más eficiente
  const previousControllersMap = new Map(previousControllers.map((ctrl) => [ctrl.model, ctrl]))
  const currentControllersMap = new Map(currentControllers.map((ctrl) => [ctrl.model, ctrl]))

  // Nuevas tarjetas gráficas
  const newGraphics = currentControllers.filter((ctrl) => !previousControllersMap.has(ctrl.model))

  // Tarjetas eliminadas
  const removedGraphics = previousControllers.filter(
    (ctrl) => !currentControllersMap.has(ctrl.model)
  )

  // Tarjetas modificadas
  const updatedGraphics = currentControllers.filter((current) => {
    const prev = previousControllersMap.get(current.model)
    if (!prev) return false
    return prev.vram !== current.vram || prev.bus !== current.bus
  })

  return {
    newGraphics,
    removedGraphics,
    updatedGraphics
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

export function changesDeviceInit() {
  changesCpu()
  changesBaseboard()
}
