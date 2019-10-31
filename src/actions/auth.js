import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import getApi from 'services/api'
import { errorMsgHandler } from 'utils/errorManager'
import { saveLocalUserInfo } from 'utils/session'

const { authStart, authSuccess, authError } = createActions({
  AUTH_START: () => {},
  AUTH_SUCCESS: isUserLogged => ({ isUserLogged }),
  AUTH_ERROR: error => ({ error })
})

const auth = (username, password) => {
  return async dispatch => {
    dispatch(authStart())
    const api = await getApi()
    try {
      const {
        data: {
          user,
          authorization: { token, refresh_token }
        }
      } = await api.post(API_ROUTES.LOGIN, { username, password })
      saveLocalUserInfo(user, token, refresh_token)
      dispatch(authSuccess(true))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, `Error al iniciar sesión, intente nuevamente.`)
      dispatch(authError(errorMsg))
    }
  }
}

export { auth, authStart, authSuccess, authError }
