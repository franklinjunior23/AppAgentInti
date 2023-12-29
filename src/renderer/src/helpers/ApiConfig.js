import axios from 'axios'

// eslint-disable-next-line no-undef
export const CONFIGDATAAPI = {
  API_DOMAIN: 'http://localhost:3000',
  API_VERSION: '/api/v1',
  TOKEN_USER: 'usuario_tk_invent_seg'
}

export const AxiosRest = axios.create({
  baseURL: CONFIGDATAAPI.API_DOMAIN + CONFIGDATAAPI.API_VERSION
})
AxiosRest.interceptors.request.use((config) => {
  const token = localStorage.getItem(CONFIGDATAAPI.TOKEN_USER) // Obtener el token almacenado en el localStorage
  if (token) {
    config.headers['Validation'] = token // Agregar el token al encabezado de la solicitud
  }
  return config
})
//https://dev.intisoft.com.pe
//http://localhost:3000
