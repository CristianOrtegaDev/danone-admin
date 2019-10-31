import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsError,
  submitClientStart,
  submitClientSuccess,
  submitClientError
} = createActions({
  FETCH_CLIENTS_START: () => {},
  FETCH_CLIENTS_SUCCESS: data => ({ data }),
  FETCH_CLIENTS_ERROR: error => ({ error }),
  SUBMIT_CLIENT_START: () => {},
  SUBMIT_CLIENT_SUCCESS: data => ({ data }),
  SUBMIT_CLIENT_ERROR: error => ({ error })
})

const fetchClients = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchClientsStart())
    const api = await getApi()
    let { clients } = getState()
    let actualTake = reset === true ? 15 : clients.take

    try {
      const response = await api.get(`${API_ROUTES.CLIENTS_PAGINATED}/${BASE_PAGE}/${actualTake}`)

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 15 : actualTake

      dispatch(fetchClientsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_CLIENTS_ERROR'))
      dispatch(fetchClientsError(errorMsg))
    }
  }
}

const activateClient = adminId => {
  return async dispatch => {
    dispatch(submitClientStart())
    const api = await getApi()
    try {
      await api.patch(`${API_ROUTES.ACTIVATE_CLIENT}/${adminId}`)
      dispatch(submitClientSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('ACTIVATE_CLIENT_ERROR'))
      dispatch(submitClientError(errorMsg))
    }
  }
}

const deactivateClient = adminId => {
  return async dispatch => {
    dispatch(submitClientStart())
    const api = await getApi()
    try {
      await api.delete(`${API_ROUTES.CLIENT}/${adminId}`)
      dispatch(submitClientSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('DEACTIVATE_CLIENT_ERROR'))
      dispatch(submitClientError(errorMsg))
    }
  }
}

const submitClient = client => {
  return async dispatch => {
    dispatch(submitClientStart())
    const api = await getApi()
    try {
      await api.post(`${API_ROUTES.CLIENT}`, client)
      dispatch(submitClientSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('NEW_CLIENT_ERROR'))
      dispatch(submitClientError(errorMsg))
    }
  }
}

const editClient = client => {
  return async dispatch => {
    dispatch(submitClientStart())
    const api = await getApi()
    try {
      await api.put(`${API_ROUTES.CLIENT}`, client)
      dispatch(submitClientSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('EDIT_CLIENT_ERROR'))
      dispatch(submitClientError(errorMsg))
    }
  }
}

export {
  fetchClients,
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsError,
  submitClient,
  submitClientStart,
  submitClientSuccess,
  submitClientError,
  activateClient,
  deactivateClient,
  editClient
}
