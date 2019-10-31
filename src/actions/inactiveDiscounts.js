import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchInactiveDiscountsStart,
  fetchInactiveDiscountsSuccess,
  fetchInactiveDiscountsError
} = createActions({
  FETCH_INACTIVE_DISCOUNTS_START: () => {},
  FETCH_INACTIVE_DISCOUNTS_SUCCESS: data => ({ data }),
  FETCH_INACTIVE_DISCOUNTS_ERROR: error => ({ error })
})

const fetchInactiveDiscounts = (productId, page) => {
  return async dispatch => {
    dispatch(fetchInactiveDiscountsStart())
    const api = await getApi()
    const take = 10
    try {
      const response = await api.get(
        `${API_ROUTES.DISCOUNTS_PAGINATED_INACTIVE}/${page}/${take}?product-id=${productId}`
      )
      let hasMore = response.data.length === take
      dispatch(fetchInactiveDiscountsSuccess({ values: response.data, page, hasMore }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_INACTIVE_DISCOUNTS_ERROR'))
      dispatch(fetchInactiveDiscountsError(errorMsg))
    }
  }
}

export {
  fetchInactiveDiscounts,
  fetchInactiveDiscountsStart,
  fetchInactiveDiscountsSuccess,
  fetchInactiveDiscountsError
}
