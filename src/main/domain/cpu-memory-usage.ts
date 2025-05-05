import si from 'systeminformation'
import { EventsService } from '../config/events/event-service'

export let cpuUsageData // 🔹 Almacena el uso de CPU
export let ramUsageData // 🔹 Almacena el uso de RAM
export let diskUsageData // 🔹 Almacena el uso de disco

async function CpuMemoryUsage(): Promise<void> {
  let lastDiskUpdate = 0 // 🔹 Última actualización de discos
  let lastDiskUsage = [] // 🔹 Almacena la última data de discos

  while (true) {
    const now = Date.now() // ⏳ Tiempo actual

    // 🔹 Obtener CPU y RAM en cada ciclo
    const [load, mem] = await Promise.all([si.currentLoad(), si.mem()])

    cpuUsageData = load.currentLoad.toFixed(2) // 🔹 Uso de CPU
    ramUsageData = ((mem.active / mem.total) * 100).toFixed(2) // 🔹 Uso de RA

    const cpuUsage = load.currentLoad.toFixed(2)
    const ramUsage = ((mem.active / mem.total) * 100).toFixed(2)

    // 🔹 Si han pasado 2 minutos o es la primera ejecución, actualizar discos
    if (lastDiskUpdate === 0 || now - lastDiskUpdate >= 120000) {
      const disks = await si.fsSize()
      lastDiskUsage = disks.map((disk) => ({
        mount: disk.mount,
        used: ((disk.used / disk.size) * 100).toFixed(2),
        total: (disk.size / 1024 ** 3).toFixed(2)
      }))
      lastDiskUpdate = now // 🔥 Guardar el tiempo de la última actualización
      diskUsageData = disks.map((disk) => ({
        mount: disk.mount,
        used: ((disk.used / disk.size) * 100).toFixed(2),
        total: (disk.size / 1024 ** 3).toFixed(2)
      })) // 🔹 Actualizar el uso de disco
    }

    // 🔹 Emitir el evento con la última data de discos
    EventsService.emit('update', { cpuUsage, ramUsage, diskUsage: lastDiskUsage })

    await new Promise((resolve) => setTimeout(resolve, 3000)) // ⏳ Espera 3s antes del siguiente ciclo
  }
}

export default CpuMemoryUsage
