import axios from 'axios'

// eslint-disable-next-line no-undef
export const CONFIGDATAAPI = {
  API_DOMAIN: 'https://dev.intisoft.com.pe',
  API_VERSION: '/api/v1',
  TOKEN_USER: 'usuario_tk_invent_seg'
}

const tokenBearer =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2N2FiYTBkLWRjMmUtNGMzMC1hYjA0LWQ4NTdkOTI3NGVlMSIsInVzZXIiOiJmcmFua2xpbiIsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzQwNzc3NjY1fQ.ibJH-O_agj5-uN8R3OexumVt7mDEMEhcz-Cz3Aosf40'

export const AxiosRest = axios.create({
  baseURL: CONFIGDATAAPI.API_DOMAIN + CONFIGDATAAPI.API_VERSION,
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },

  withCredentials: true
})

AxiosRest.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${tokenBearer}`

    return config
  },
  (error) => Promise.reject(error)
)
