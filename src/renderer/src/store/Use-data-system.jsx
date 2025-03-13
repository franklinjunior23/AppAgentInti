import React, { createContext, useContext, useEffect, useState } from 'react'

const Contextdatadevice = createContext()

export const useDataSystem = () => {
  return useContext(Contextdatadevice)
}

export const ProvideSystemData = ({ children }) => {
  const [datainformation, setdatainformation] = useState(null)
  const [UpdateAvailableInfo, setUpdateAvailableInfo] = useState({})
  const [cpu, setCpu] = useState('0')
  const [ram, setRam] = useState('0')
  const [disks, setDisks] = useState([])

  const [dataCompany, setdataCompany] = useState(() => {
    return JSON.parse(localStorage.getItem('Data_Empresa')) ?? null
  })
  const [tokenBranch, setTokenBranch] = useState(() => {
    return localStorage.getItem('TokenSucursal') ?? null
  })
  const [IdDevice, setIdDevice] = useState(() => {
    return localStorage.getItem('IdDispositivo') ?? null
  })

  useEffect(() => {
    window.systemAPI.onUpdateAvailable((data) => {
      setUpdateAvailableInfo(data)
    })

    return () => {
      window.systemAPI.removeListenerUpdateAvailable()
    }
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.on('message', (event, message) => {
      console.log('Mensaje recibido en el componente de React:', message)
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('message') // Limpiar el listener cuando el componente se desmonte
    }
  }, []) // Asegurarse de que este efecto se ejecute solo una vez

  useEffect(() => {
    // Escuchar la información del sistema desde el backend
    window.systemAPI.onSystemInfo((data) => {
      console.log('Información del sistema recibida:', data)
      setdatainformation(data)
    })

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.systemAPI.removeSystemInfoListener()
    }
  }, [])
  // No necesitas incluir datainformation en las dependencias porque el efecto solo se ejecuta una vez al montar el componente

  useEffect(() => {
    function handleStorage() {
      const dataCompany = localStorage.getItem('Data_Empresa')
      const tokenBranch = localStorage.getItem('TokenSucursal')
      const IdDevice = localStorage.getItem('IdDispositivo')
      setdataCompany(dataCompany)
      setTokenBranch(tokenBranch)
      setIdDevice(IdDevice)
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [dataCompany, tokenBranch, IdDevice])

  useEffect(() => {
    const updateStats = ({ cpuUsage, ramUsage, diskUsage }) => {
      setCpu(cpuUsage)
      setRam(ramUsage)
      setDisks(diskUsage)
    }

    window.systemAPI.onSystemStats(updateStats) // 📡 Escuchar el evento

    return () => {
      window.systemAPI.removeSystemStats(updateStats) // 🧹 Limpiar el evento al desmontar
    }
  }, [])
  return (
    <Contextdatadevice.Provider
      value={{
        datainformation,
        dataCompany,
        tokenBranch,
        IdDevice,
        UpdateAvailableInfo,
        cpu,
        ram,
        disks
      }}
    >
      {children}
    </Contextdatadevice.Provider>
  )
}

export default Contextdatadevice
