import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchInactiveClientsStart,
  fetchInactiveClientsSuccess,
  fetchInactiveClientsError
} = createActions({
  FETCH_INACTIVE_CLIENTS_START: () => {},
  FETCH_INACTIVE_CLIENTS_SUCCESS: data => ({ data }),
  FETCH_INACTIVE_CLIENTS_ERROR: error => ({ error })
})

const fetchInactiveClients = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchInactiveClientsStart())
    const api = await getApi()
    let { inactiveClients } = getState()
    let actualTake = reset === true ? 10 : inactiveClients.take

    try {
      const response = await api.get(
        `${API_ROUTES.CLIENTS_PAGINATED}/${BASE_PAGE}/${actualTake}/inactive`
      )

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 10 : actualTake

      dispatch(fetchInactiveClientsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_CLIENTS_ERROR'))
      dispatch(fetchInactiveClientsError(errorMsg))
    }
  }
}

export {
  fetchInactiveClients,
  fetchInactiveClientsStart,
  fetchInactiveClientsSuccess,
  fetchInactiveClientsError
}
