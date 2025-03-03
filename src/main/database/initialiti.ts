import db from './db'
import { migration_initial } from './tables'

export function Initialiti() {
  try {
    db.exec(migration_initial)
  } catch (error) {
    console.error('Error al crear la base de datos:', error)
  }
}
