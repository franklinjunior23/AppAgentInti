import { AxiosRest } from '@/helpers/ApiConfig'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export async function recoveryConection(codeDevice , handleChange) {
  try {
    const { data } = await AxiosRest.post('/device/recovery', {
      codeDevice: codeDevice
    })
    if(!data?.success) return 
    
    if (data?.success) {
      toast.success('Recuperacion exitosa')
      window.systemAPI.sendSignDevice({
        id_device: data?.id_device
      })
      handleChange('id_device', data?.id_device)
      localStorage.setItem('id_device', data?.id_device)
    }
  } catch (error) {
    toast.error('Error al recuperar la conexión' + error?.message)
  }
}

export function HandleChangeSetting() {
  const [dataSetting, setDataSetting] = useState({})

  useEffect(() => {
    window.systemAPI.getConfig().then((data) => {
      if (data) {
        setDataSetting(data)
      }
    })
  }, [])

  const handleChange = (key, value) => {
    const updatedConfig = { ...dataSetting, [key]: value }
    setDataSetting(updatedConfig)
    window.systemAPI.saveConfig(updatedConfig)
  }
  return {
    handleChange,
    dataSetting
  }
}
