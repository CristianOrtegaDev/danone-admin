import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { errorMsgHandler } from 'utils/errorManager'
import { BASE_TAKE, BASE_PAGE } from 'constants/pagination'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError,
  submitProductStart,
  submitProductSuccess,
  submitProductError,
  productsReset
} = createActions({
  FETCH_PRODUCTS_START: () => {},
  FETCH_PRODUCTS_SUCCESS: data => ({ data }),
  FETCH_PRODUCTS_ERROR: error => ({ error }),
  SUBMIT_PRODUCT_START: () => {},
  SUBMIT_PRODUCT_SUCCESS: data => ({ data }),
  SUBMIT_PRODUCT_ERROR: error => ({ error }),
  PRODUCTS_RESET: () => {}
})

const fetchProducts = (brandId, reset) => {
  return async (dispatch, getState) => {
    dispatch(fetchProductsStart())
    const api = await getApi()
    let { products } = getState()

    let actualTake = reset === true ? BASE_TAKE : products.take
    try {
      const response = await api.get(
        `${API_ROUTES.PRODUCT_BRAND}/${brandId}/paginated/${BASE_PAGE}/${actualTake}`
      )
      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 10 : actualTake
      dispatch(fetchProductsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_MALE').PLURAL} ${i18n(
          'PRODUCTS'
        )}`
      )
      dispatch(fetchProductsError(errorMsg))
    }
  }
}

const searchProducts = (name, reset) => {
  return async (dispatch, getState) => {
    dispatch(fetchProductsStart())
    const api = await getApi()
    let { products } = getState()

    let actualTake = reset === true ? 20 : products.take
    try {
      const response = await api.get(
        `${API_ROUTES.PRODUCTS_SEARCH}/${name}/paginated/${BASE_PAGE}/${actualTake}`
      )
      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 10 : actualTake
      dispatch(fetchProductsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_MALE').PLURAL} ${i18n(
          'PRODUCTS'
        )}`
      )
      dispatch(fetchProductsError(errorMsg))
    }
  }
}

const submitProduct = product => {
  return async dispatch => {
    dispatch(submitProductStart())
    const api = await getApi()
    try {
      const response = await api.post(API_ROUTES.PRODUCTS, product)
      dispatch(submitProductSuccess(response.data))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('CREATE')} ${i18n('THE_MALE').SINGULAR} ${i18n(
          'PRODUCT'
        )}`
      )
      dispatch(submitProductError(errorMsg))
    }
  }
}

const editProduct = product => {
  return async dispatch => {
    dispatch(submitProductStart())
    const api = await getApi()
    try {
      const response = await api.put(`${API_ROUTES.PRODUCTS}`, product)
      dispatch(submitProductSuccess(response.data))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('EDIT')} ${i18n('THE_MALE').SINGULAR} ${i18n(
          'PRODUCT'
        )}`
      )
      dispatch(submitProductError(errorMsg))
    }
  }
}

const deleteProduct = productId => {
  return async dispatch => {
    dispatch(submitProductStart())
    const api = await getApi()
    try {
      const response = await api.delete(`${API_ROUTES.PRODUCTS}/${productId}`)
      dispatch(submitProductSuccess(response.data))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('DELETE')} ${i18n('THE_MALE').SINGULAR} ${i18n(
          'PRODUCT'
        )}`
      )
      dispatch(submitProductError(errorMsg))
    }
  }
}

const activateProduct = productId => {
  return async dispatch => {
    dispatch(submitProductStart())
    const api = await getApi()
    try {
      const response = await api.patch(`${API_ROUTES.PRODUCTS}/activate/${productId}`)
      dispatch(submitProductSuccess(response.data))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('ACTIVATE')} ${i18n('THE_MALE').SINGULAR} ${i18n(
          'PRODUCT'
        )}`
      )
      dispatch(submitProductError(errorMsg))
    }
  }
}

const resetProducts = () => dispatch => dispatch(productsReset())

export {
  fetchProducts,
  searchProducts,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError,
  submitProduct,
  submitProductStart,
  submitProductSuccess,
  submitProductError,
  editProduct,
  deleteProduct,
  resetProducts,
  productsReset,
  activateProduct
}
