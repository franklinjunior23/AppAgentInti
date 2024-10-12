import axios from 'axios'

// eslint-disable-next-line no-undef
export const CONFIGDATAAPI = {
  API_DOMAIN: 'http://localhost:3000',
  API_VERSION: '/api/v1',
  TOKEN_USER: 'usuario_tk_invent_seg'
}

export const AxiosRest = axios.create({
  baseURL: CONFIGDATAAPI.API_DOMAIN + CONFIGDATAAPI.API_VERSION,
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})
