import sqlite3 from 'sqlite3'
import { pathFileDbConfig } from '../contants/name-config'


const db = new sqlite3.Database(pathFileDbConfig, (err) => {
    if (err) {
        console.error('❌ Error al conectar con SQLite:', err.message)
    } else {
        console.log('✅ Conectado a la base de datos SQLite')
    }
})

export default db
