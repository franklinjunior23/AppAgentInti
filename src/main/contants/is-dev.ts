export const isDevelopment = process.env.NODE_ENV === 'development'
export const API_URL_DEVELOPMENT = 'http://localhost:3000/api/v1'
export const API_URL_PRODUCTION = 'https://dev.intisoft.com.pe/api/v1'
export const API_URL = isDevelopment ? API_URL_DEVELOPMENT : API_URL_PRODUCTION
