export const DateForday = () => {
  return new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima'
  })
}
export const dateForPeru = () => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Lima' }))
}

export function getDateFilename() {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}.json`
}
