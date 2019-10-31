import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const { fetchProductDataStart, fetchProductDataSuccess, fetchProductDataError } = createActions({
  FETCH_PRODUCT_DATA_START: () => {},
  FETCH_PRODUCT_DATA_SUCCESS: data => ({ data }),
  FETCH_PRODUCT_DATA_ERROR: error => ({ error })
})

const fetchProductData = id => async dispatch => {
  dispatch(fetchProductDataStart())
  const api = await getApi()
  try {
    const response = await api.get(`${API_ROUTES.PRODUCTS}/${id}`)
    dispatch(fetchProductDataSuccess(response.data))
  } catch (error) {
    const errorMsg = errorMsgHandler(error, i18n('PRODUCT_DATA_ERROR'))
    dispatch(fetchProductDataError(errorMsg))
  }
}

export { fetchProductData, fetchProductDataStart, fetchProductDataSuccess, fetchProductDataError }
