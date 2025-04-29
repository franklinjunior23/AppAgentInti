import { IpcMainEvent } from 'electron'
import db from '../db'
import { GET_NOTIFICATION_REPLY } from '../../contants/name-notifitacion'
import { sendSystemError } from '../../helper/error'
import Logger from 'electron-log'

// 🔹 Obtener notificaciones con paginación
export function getNotificationPaginate(event: IpcMainEvent, limit = 20, offset = 0) {
  const query = `SELECT * FROM notifications ORDER BY createdAt DESC LIMIT ? OFFSET ?`

  db.all(query, [limit, offset], (err, rows) => {
    if (err) {
      Logger.error('Error al obtener notificaciones:', err.message)
      return event.reply(GET_NOTIFICATION_REPLY, { error: err.message })
    }
    event.reply(GET_NOTIFICATION_REPLY, { data: rows })
  })
}


// 🔹 Insertar una nueva notificación
export function creatNotification(
  event: IpcMainEvent | undefined,
  data: { title: string; message: string; type: string }
) {
  const query = `INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)`
  const params = [data.title, data.message, data.type]

  db.run(query, params, function (err) {
    if (err) {
      Logger.error('Error al crear notificación:', err.message)
      if (event) {
        sendSystemError(event, {
          title: '❌ Error al crear notificación',
          message: 'No se pudo crear la notificación.',
          success: false
        })
      }
    }

    if (event) {
      event.reply(GET_NOTIFICATION_REPLY, { message: 'Notificación creada' })
    }
  })
}
