import { AxiosRest } from '@/helpers/ApiConfig'
import { DataInformationPC } from '@/store'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

export function UseAuthDevice() {
  const { TrueOpenAuth, AddDispositivoId } = DataInformationPC()
  function HandleStorageDevice({ data }) {
    window.electron.ipcRenderer.send('device-data', data)
  }
  return useMutation({
    mutationFn: async (data) => {
      const response = await AxiosRest.post('/Dispositivos/Agent/Auth', {
        ...data
      })
      return response.data
    },
    onSuccess: (data) => {
      if (data.auth === false) {
        return toast.error(data.message)
      }
      TrueOpenAuth()
      HandleStorageDevice({ data: data.Id })
      localStorage.setItem('IdDispositivo', data?.Id)
      localStorage.setItem('Data_Empresa', JSON.stringify(data.Data_empresa))
      AddDispositivoId(data.Id)
      toast.success(data.message)
      return alert('Dispositivo registrado correctamente')
    },
    onError: (error) => {
      return toast.error(error.message)
    }
  })
}
