import si from 'systeminformation'
import os from 'os'

export async function collectSystemInfo() {
  try {
    const systemReport = await si.get({
      system: '*',
      osInfo: '*',
      bios: '*',
      baseboard: '*',
      cpu: '*',
      cpuCache: '*',
      memory: '*',
      graphics: '*',
      disks: '*',
      battery: '*',
      audio: '*',
      networkInterfaces: '*',
      currentLoad: '*',
      processes: '*',
      services: '*',
      virtualization: '*',
      bluetooth: '*',
      wifi: '*',
      users: '*',
      time: '*'
    })

    // Agregar información adicional
    systemReport.currentUser = os.userInfo().username

    const diskLayout = await si.diskLayout()
    systemReport.disks = diskLayout.map((disk) => ({
      name: disk.name,
      vendor: disk.vendor,
      size: disk.size,
      type: disk.type,
      interfaceType: disk.interfaceType,
      rpm: disk.rpm,
      partitions: disk.partitions.map((partition) => ({
        name: partition.name,
        size: partition.size,
        type: partition.type,
        mount: partition.mount,
        fsType: partition.fsType
      }))
    }))

    return systemReport
  } catch (error) {
    console.error('Error al recopilar información del sistema:', error)
    return null
  }
}
