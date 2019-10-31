import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import { BASE_TAKE, BASE_PAGE } from 'constants/pagination'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchOrdersPendentStart,
  fetchOrdersPendentSuccess,
  fetchOrdersPendentError
} = createActions({
  FETCH_ORDERS_PENDENT_START: () => {},
  FETCH_ORDERS_PENDENT_SUCCESS: data => ({ data }),
  FETCH_ORDERS_PENDENT_ERROR: error => ({ error })
})

const fetchOrdersPendent = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchOrdersPendentStart())
    const api = await getApi()

    let { ordersPendent } = getState()

    let actualTake = reset === true ? 15 : ordersPendent.take

    try {
      const response = await api.get(`${API_ROUTES.ORDERS_PENDENT}/${BASE_PAGE}/${BASE_TAKE}`)

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 15 : actualTake

      dispatch(fetchOrdersPendentSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${
          i18n('THE_FEMALE').PLURAL
        } ordenes pendientes`
      )
      dispatch(fetchOrdersPendentError(errorMsg))
    }
  }
}

export {
  fetchOrdersPendent,
  fetchOrdersPendentStart,
  fetchOrdersPendentSuccess,
  fetchOrdersPendentError
}
