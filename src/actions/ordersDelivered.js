import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import { BASE_TAKE, BASE_PAGE } from 'constants/pagination'
import i18n from 'services/i18n'
import getApi from 'services/api'

const {
  fetchOrdersDeliveredStart,
  fetchOrdersDeliveredSuccess,
  fetchOrdersDeliveredError
} = createActions({
  FETCH_ORDERS_DELIVERED_START: () => {},
  FETCH_ORDERS_DELIVERED_SUCCESS: data => ({ data }),
  FETCH_ORDERS_DELIVERED_ERROR: error => ({ error })
})

const fetchOrdersDelivered = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchOrdersDeliveredStart())
    const api = await getApi()
    let { ordersDelivered } = getState()

    let actualTake = reset === true ? 15 : ordersDelivered.take

    try {
      const response = await api.get(`${API_ROUTES.ORDERS_DELIVERED}/${BASE_PAGE}/${BASE_TAKE}`)

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 15 : actualTake

      dispatch(fetchOrdersDeliveredSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${
          i18n('THE_FEMALE').PLURAL
        } ordenes entregadas`
      )
      dispatch(fetchOrdersDeliveredError(errorMsg))
    }
  }
}

export {
  fetchOrdersDelivered,
  fetchOrdersDeliveredStart,
  fetchOrdersDeliveredSuccess,
  fetchOrdersDeliveredError
}
