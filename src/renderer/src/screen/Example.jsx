import { useEffect, useState } from 'react'

function Example() {
  const [dataPc, setdataPc] = useState(null)
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await window.api.getOs()
        setdataPc(data)
      } catch (error) {
        console.error('Error al obtener datos del sistema operativo:', error)
        // Aquí podrías establecer un estado de error y mostrar un mensaje al usuario
      }
    }

    fetchData()
  }, [])

  /**
 *   useEffect(() => {
    window.electron.ipcRenderer.on('pong', (event, message) => {
      alert(message)
    })
    return window.electron.ipcRenderer.removeAllListeners('pong')
  }, [])
 *
 *
 */
  if (dataPc) console.log(dataPc)
  return (
    <div>
      <button onClick={ipcHandle}>Report</button>
    </div>
  )
}

export default Example
