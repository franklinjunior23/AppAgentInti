import fs from 'fs'

export function validateDirectory(directory: string): void {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
  } catch (error) {
    console.error('Error creating directory', error)
  }
}
