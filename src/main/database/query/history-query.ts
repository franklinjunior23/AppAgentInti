import Logger from 'electron-log'
import db from '../db'
import { IpcMainEvent } from 'electron'
import { GET_HISTORY_REPLY } from '../../contants/name-history'

export function getHistoryPaginate(limit = 20, offset = 0): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM history ORDER BY createdAt DESC LIMIT ? OFFSET ?`

    db.all(query, [limit, offset], (err, rows) => {
      if (err) {
        Logger.error('Error al obtener historial:', err.message)
        console.error('Error al obtener historial:', err.message)
        reject(err) 
      } else {
        resolve(rows) 
      }
    })
  })
}

interface History {
  title: string
  description: string
  event?: IpcMainEvent
}
export function CreateHistory({ description, title, event }: History) {
  const query = `INSERT INTO history (title, description) VALUES (?, ?)`
  const params = [title, description]

  db.run(query, params, function (err) {
    if (err) {
      Logger.error('Error al crear historial:', err.message)
      return event.reply(GET_HISTORY_REPLY, { error: err.message })
    }
    if (event) {
      event.reply(GET_HISTORY_REPLY, {
        title: title,
        description: description,
        createdAt: new Date()
      })
    }
  })
}

export function checkAndInsertHistory() {
  const queryCount = `SELECT COUNT(*) AS count FROM history`

  db.get(queryCount, (err, row: { count: number }) => {
    if (err) {
      Logger.error('Error al obtener el historial:', err.message)
      return
    }
    if (row.count < 1) {
      CreateHistory({
        title: '🆕 Primera conexión registrada con el sistema en este dispositivo',
        description:
          'Este dispositivo ha sido registrado por primera vez en el sistema de monitoreo.'
      })

      Logger.info(`🆕 Primera conexión registrada con el sistema en este dispositivo ${new Date()}`)
    }
  })
}
