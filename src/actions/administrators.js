import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchAdministratorsStart,
  fetchAdministratorsSuccess,
  fetchAdministratorsError,
  submitAdminStart,
  submitAdminSuccess,
  submitAdminError
} = createActions({
  FETCH_ADMINISTRATORS_START: () => {},
  FETCH_ADMINISTRATORS_SUCCESS: data => ({ data }),
  FETCH_ADMINISTRATORS_ERROR: error => ({ error }),
  SUBMIT_ADMIN_START: () => {},
  SUBMIT_ADMIN_SUCCESS: data => ({ data }),
  SUBMIT_ADMIN_ERROR: error => ({ error })
})

const fetchAdministrators = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchAdministratorsStart())
    const api = await getApi()
    let { administrators } = getState()
    let actualTake = reset === true ? 15 : administrators.take

    try {
      const response = await api.get(
        `${API_ROUTES.ADMINISTRATORS_PAGINATED}/${BASE_PAGE}/${actualTake}`
      )

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 15 : actualTake

      dispatch(fetchAdministratorsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_ADMINS_ERROR'))
      dispatch(fetchAdministratorsError(errorMsg))
    }
  }
}

const activateAdmin = adminId => {
  return async dispatch => {
    dispatch(submitAdminStart())
    const api = await getApi()
    try {
      await api.patch(`${API_ROUTES.ACTIVATE_ADMINISTRATOR}/${adminId}`)
      dispatch(submitAdminSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('ACTIVATE_ADMIN_ERROR'))
      dispatch(submitAdminError(errorMsg))
    }
  }
}

const deactivateAdmin = adminId => {
  return async dispatch => {
    dispatch(submitAdminStart())
    const api = await getApi()
    try {
      await api.delete(`${API_ROUTES.ADMINISTRATOR}/${adminId}`)
      dispatch(submitAdminSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('DEACTIVATE_ADMIN_ERROR'))
      dispatch(submitAdminError(errorMsg))
    }
  }
}

const submitAdmin = admin => {
  return async dispatch => {
    dispatch(submitAdminStart())
    const api = await getApi()
    try {
      await api.post(`${API_ROUTES.ADMINISTRATOR}`, admin)
      dispatch(submitAdminSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('NEW_ADMIN_ERROR'))
      dispatch(submitAdminError(errorMsg))
    }
  }
}

export {
  fetchAdministrators,
  fetchAdministratorsStart,
  fetchAdministratorsSuccess,
  fetchAdministratorsError,
  submitAdmin,
  submitAdminStart,
  submitAdminSuccess,
  submitAdminError,
  activateAdmin,
  deactivateAdmin
}
