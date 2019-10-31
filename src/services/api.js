import axios from 'axios'
import API_ROUTES from 'config/apiRoutes'
import { getToken } from 'utils/session'
import { saveToken, getRefreshToken } from 'utils/session'

export default () => {
  const accessToken = getToken()

  let headerConf = {
    Authorization: `Bearer ${accessToken}`
  }

  let api = axios.create({
    baseURL: API_ROUTES.BASE_URL,
    headers: {
      common: headerConf
    }
  })

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      if (error.response.status === 401) {
        const token = await getNewToken()

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        originalRequest.headers['Authorization'] = `Bearer ${token}`

        return await axios(originalRequest)
      }

      return Promise.reject(error)
    }
  )

  return api
}

export const getNewToken = async () => {
  const params = {}

  const refreshToken = getRefreshToken()

  const api = axios.create({
    baseURL: API_ROUTES.BASE_URL,
    headers: {
      common: {
        'x-refresh-token': refreshToken
      }
    }
  })

  const {
    data: { token }
  } = await api.post(API_ROUTES.REFRESH_TOKEN, params)

  saveToken(token)

  return token
}
