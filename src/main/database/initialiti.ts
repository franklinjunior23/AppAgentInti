import Database from 'better-sqlite3'
import { migration_initial } from './tables'
import { pathFileDbConfig } from '../contants/name-config'
import db from './db'

export function Initialiti() {
  try {
    db.exec(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now', 'localtime'))
);`)
  } catch (error) {
    console.error('Error al crear la base de datos:', error)
  }
}
