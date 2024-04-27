import React, { createContext, useContext, useEffect, useState } from 'react'

const Contextdatadevice = createContext()

export const useDataSystem = () => {
  return useContext(Contextdatadevice)
}

export const ProvideSystemData = ({ children }) => {
  const [datainformation, setdatainformation] = useState(null)
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
    // Función para obtener y establecer la información del sistema
    const fetchSystemInfo = () => {
      window.api.getOs().then((data) => {
        console.log(data)
        setdatainformation(data)
      })
    }

    // Llamar a fetchSystemInfo inmediatamente cuando se monta el componente
    fetchSystemInfo()

    // Establecer un intervalo para llamar fetchSystemInfo cada 3 minutos
    const intervalId = setInterval(fetchSystemInfo, 3 * 60 * 1000) // 3 minutos en milisegundos

    // Limpia el intervalo cuando el componente se desmonta o cuando datainformation cambia
    return () => {
      clearInterval(intervalId)
    }
  }, []) // No necesitas incluir datainformation en las dependencias porque el efecto solo se ejecuta una vez al montar el componente

  useEffect(() => {
    function handleStorage() {
      const dataCompany = localStorage.getItem('Data_Empresa')
      console.log(dataCompany)
      const tokenBranch = localStorage.getItem('TokenSucursal')
      const IdDevice = localStorage.getItem('IdDispositivo')
      console.log('validadndo')

      setdataCompany(dataCompany)
      setTokenBranch(tokenBranch)
      setIdDevice(IdDevice)
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [dataCompany, tokenBranch, IdDevice])

  return (
    <Contextdatadevice.Provider
      value={{
        datainformation,
        dataCompany,
        tokenBranch,
        IdDevice
      }}
    >
      {children}
    </Contextdatadevice.Provider>
  )
}

export default Contextdatadevice
