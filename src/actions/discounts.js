import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchDiscountsStart,
  fetchDiscountsSuccess,
  fetchDiscountsError,
  submitDiscountStart,
  submitDiscountSuccess,
  submitDiscountError
} = createActions({
  FETCH_DISCOUNTS_START: () => {},
  FETCH_DISCOUNTS_SUCCESS: data => ({ data }),
  FETCH_DISCOUNTS_ERROR: error => ({ error }),
  SUBMIT_DISCOUNT_START: () => {},
  SUBMIT_DISCOUNT_SUCCESS: data => ({ data }),
  SUBMIT_DISCOUNT_ERROR: error => ({ error })
})

const fetchDiscounts = (productId, page) => {
  return async dispatch => {
    dispatch(fetchDiscountsStart())
    const api = await getApi()
    const take = 10
    try {
      const response = await api.get(
        `${API_ROUTES.DISCOUNTS_PAGINATED}/${page}/${take}?product-id=${productId}`
      )
      let hasMore = response.data.length === take
      dispatch(fetchDiscountsSuccess({ values: response.data, page, hasMore }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_ACTIVE_DISCOUNTS_ERROR'))
      dispatch(fetchDiscountsError(errorMsg))
    }
  }
}

const activateDiscount = adminId => {
  return async dispatch => {
    dispatch(submitDiscountStart())
    const api = await getApi()
    try {
      await api.patch(`${API_ROUTES.ACTIVATE_DISCOUNT}/${adminId}`)
      dispatch(submitDiscountSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('ACTIVATE_DISCOUNT_ERROR'))
      dispatch(submitDiscountError(errorMsg))
    }
  }
}

const deactivateDiscount = discountId => {
  return async dispatch => {
    dispatch(submitDiscountStart())
    const api = await getApi()
    try {
      await api.delete(`${API_ROUTES.DISCOUNT}/${discountId}`)
      dispatch(submitDiscountSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('DEACTIVATE_DISCOUNT_ERROR'))
      dispatch(submitDiscountError(errorMsg))
    }
  }
}

const submitDiscount = discount => {
  return async dispatch => {
    dispatch(submitDiscountStart())
    const api = await getApi()
    try {
      await api.post(`${API_ROUTES.DISCOUNT}`, discount)
      dispatch(submitDiscountSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('NEW_DISCOUNT_ERROR'))
      dispatch(submitDiscountError(errorMsg))
    }
  }
}

export {
  fetchDiscounts,
  fetchDiscountsStart,
  fetchDiscountsSuccess,
  fetchDiscountsError,
  submitDiscount,
  submitDiscountStart,
  submitDiscountSuccess,
  submitDiscountError,
  activateDiscount,
  deactivateDiscount
}
