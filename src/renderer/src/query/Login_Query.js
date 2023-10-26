import { useMutation } from 'react-query'
import { AxiosRest } from '../helpers/ApiConfig'

export const { mutate: MUTATELOGIN } = useMutation({
  mutationFn: async (datos) => {
    const { data } = await AxiosRest.post('auth/login', datos)
    return data
  },
  onSuccess: (data) => {
    console.log(data)
  },
  onError: (error) => {
    console.log(error)
  }
})
