import { AxiosRest } from '@/helpers/ApiConfig'
import { useDataSystem } from '@/store/Use-data-system'
import { useQuery } from 'react-query'

export function GetConnectedUser() {
  const { datainformation } = useDataSystem()

  if (!datainformation?.id_device) return null

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await AxiosRest.get(`/device/${datainformation?.id_device}`)
      return data
    }
  })
}
