import db from "../db"

export async function getRam() {
  const data = await db.all('SELECT * FROM ram')
  return data
}
