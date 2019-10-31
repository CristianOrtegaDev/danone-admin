import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import { BASE_TAKE, BASE_PAGE } from 'constants/pagination'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchInactiveProductsStart,
  fetchInactiveProductsSuccess,
  fetchInactiveProductsError,
  inactiveProductsReset
} = createActions({
  FETCH_INACTIVE_PRODUCTS_START: () => {},
  FETCH_INACTIVE_PRODUCTS_SUCCESS: data => ({ data }),
  FETCH_INACTIVE_PRODUCTS_ERROR: error => ({ error }),
  INACTIVE_PRODUCTS_RESET: () => {}
})

const fetchInactiveProducts = (brandId, reset) => {
  return async (dispatch, getState) => {
    dispatch(fetchInactiveProductsStart())
    const api = await getApi()
    let { products } = getState()

    let actualTake = reset === true ? BASE_TAKE : products.take
    try {
      const response = await api.get(
        `${API_ROUTES.PRODUCT_BRAND}/${brandId}/paginated/${BASE_PAGE}/${actualTake}/inactive`
      )
      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 10 : actualTake
      dispatch(fetchInactiveProductsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_MALE').PLURAL} ${i18n(
          'INACTIVE_PRODUCTS'
        )}`
      )
      dispatch(fetchInactiveProductsError(errorMsg))
    }
  }
}

const resetInactiveProducts = () => dispatch => dispatch(inactiveProductsReset())

export {
  fetchInactiveProducts,
  fetchInactiveProductsStart,
  fetchInactiveProductsSuccess,
  fetchInactiveProductsError,
  resetInactiveProducts,
  inactiveProductsReset
}
