import Config from '../helper/get-config'

// heartbeat.ts
let heartbeatIntervalId: NodeJS.Timeout | null = null
let currentHeartbeatMinutes: number | null = null

const getConfig = new Config().get().id_device

function enviarHeartbeat() {
  console.log(`✅ Enviando heartbeat...`)
  // Aquí va la lógica para enviar al servidor
}

export function startOrUpdateHeartbeat(minutes: number) {
  if (!getConfig) return
  if (!minutes || minutes <= 0) {
    console.warn('⛔ Valor de intervalo inválido:', minutes)
    return
  }

  if (minutes !== currentHeartbeatMinutes) {
    if (heartbeatIntervalId) {
      clearInterval(heartbeatIntervalId)
      console.log('🔁 Intervalo anterior detenido')
    }

    currentHeartbeatMinutes = minutes

    // Ejecutar inmediatamente una vez
    enviarHeartbeat()

    // Y luego programar el siguiente cada X minutos
    heartbeatIntervalId = setInterval(
      () => {
        enviarHeartbeat()
      },
      minutes * 60 * 1000
    )

    console.log(`⏱️ Nuevo intervalo iniciado: ${minutes} minutos`)
  }
}
