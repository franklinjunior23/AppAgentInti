import sqlite3  from 'sqlite3'
import { pathFileDbConfig } from '../contants/name-config'
import Logger from 'electron-log'

const db = new sqlite3.Database(pathFileDbConfig, (err) => {
  if (err) {
    Logger.error('❌ Error al conectar con la base de datos:', err.message)
  } else {
    db.exec(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        rows TEXT DEFAULT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `, (err) => {
      if (err) console.error(' Error al crear las tablas:', err.message)
    })
  }
})

export default db
