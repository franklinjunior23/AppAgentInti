import axios from 'axios'
import Config from '../helper/get-config'
import { app } from 'electron'

// heartbeat.ts
let heartbeatIntervalId: NodeJS.Timeout | null = null
let currentHeartbeatMinutes: number | null = null

const getConfigDevice = new Config().data

async function enviarHeartbeat() {
  try {
    const { data } = await axios.post('https://dev.intisoft.com.pe/api/v1/device/heartbeat-agent', {
      deviceId: getConfigDevice.id_device,
      appVersion: app.getVersion(),
      hearthbeatTime: new Config().data.heartbeatIntervalMinutes
    })

    console.log('Heartbeat enviado:', data)
  } catch (error) {
    console.error('Error al enviar el heartbeat:', error?.message)
  }
}

export function startOrUpdateHeartbeat(minutes: number) {
  if (!new Config().data.id_device) return
  if (!minutes || minutes <= 0) {
    console.warn('Valor de intervalo inválido:', minutes)
    return
  }

  if (minutes !== currentHeartbeatMinutes) {
    if (heartbeatIntervalId) {
      clearInterval(heartbeatIntervalId)
      console.log('Intervalo anterior detenido')
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
    console.log(`Nuevo intervalo iniciado: ${minutes} minutos`)
  }
}
