import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchOrderDetailStart,
  fetchOrderDetailSuccess,
  fetchOrderDetailError,
  resetOrderDetailReducer
} = createActions({
  FETCH_ORDER_DETAIL_START: () => {},
  FETCH_ORDER_DETAIL_SUCCESS: data => ({ data }),
  FETCH_ORDER_DETAIL_ERROR: error => ({ error }),
  RESET_ORDER_DETAIL_REDUCER: () => {}
})

const fetchOrderDetail = orderId => {
  return async dispatch => {
    dispatch(fetchOrderDetailStart())
    const api = await getApi()
    try {
      const response = await api.get(`${API_ROUTES.ORDER}/${orderId}`)
      dispatch(fetchOrderDetailSuccess(response.data))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `Error al ${i18n('OBTAIN')} ${i18n('THE_MALE').SINGULAR} detalle de la orden seleccionada`
      )
      dispatch(fetchOrderDetailError(errorMsg))
    }
  }
}

const resetOrderDetail = () => dispatch => dispatch(resetOrderDetailReducer())

export {
  fetchOrderDetail,
  fetchOrderDetailStart,
  fetchOrderDetailSuccess,
  fetchOrderDetailError,
  resetOrderDetail,
  resetOrderDetailReducer
}
