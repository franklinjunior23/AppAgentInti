import { IpcMainEvent } from 'electron'
import db from '../db'
import { GET_NOTIFICATION_REPLY } from '../../contants/name-notifitacion'
import { sendSystemError } from '../../helper/error'

export function getNotificationPaginate(event: IpcMainEvent, limit = 20, offset = 0) {
  let query = `SELECT * FROM notifications ORDER BY createdAt DESC LIMIT ? OFFSET ?`
  let params = [limit, offset]

  db.all(query, params, (err, rows) => {
    console.log(rows)
    if (err) {
      event.reply(GET_NOTIFICATION_REPLY, { error: err.message })
    } else {
      event.reply(GET_NOTIFICATION_REPLY, { data: rows })
    }
  })
}

export function creatNotification(
  event: IpcMainEvent,
  data: {
    title: string
    message: string
    type: string
  }
) {
  let query = `INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)`
  let params = [data.title, data.message, data.type]

  db.run(query, params, (err) => {
    if (err) {
      sendSystemError(event, {
        title: 'Error al crear notificación',
        message: err.message,
        success: false
      })
    } else {
      event.reply(GET_NOTIFICATION_REPLY, { message: 'Notificación creada' })
    }
  })
}
