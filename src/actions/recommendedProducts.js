/* eslint-disable max-len */
import { createActions } from 'redux-actions'
import { errorMsgHandler } from 'utils/errorManager'
import { BASE_PAGE } from 'constants/pagination'
import API_ROUTES from 'config/apiRoutes'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchRecommendedProductsStart,
  fetchRecommendedProductsSuccess,
  fetchRecommendedProductsError,
  submitRecommendedProductStart,
  submitRecommendedProductSuccess,
  submitRecommendedProductError
} = createActions({
  FETCH_RECOMMENDED_PRODUCTS_START: () => {},
  FETCH_RECOMMENDED_PRODUCTS_SUCCESS: values => ({ values }),
  FETCH_RECOMMENDED_PRODUCTS_ERROR: error => ({ error }),
  SUBMIT_RECOMMENDED_PRODUCT_START: () => {},
  SUBMIT_RECOMMENDED_PRODUCT_SUCCESS: data => ({ data }),
  SUBMIT_RECOMMENDED_PRODUCT_ERROR: error => ({ error })
})

const fetchRecommendedProducts = () => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchRecommendedProductsStart())
    try {
      const base_take = 50
      const response = await api.get(
        `${API_ROUTES.RECOMMENDED_PRODUCTS_PAGINATED}/${BASE_PAGE}/${base_take}`
      )
      dispatch(fetchRecommendedProductsSuccess(response.data))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_MALE').PLURAL} ${i18n(
          'PRODUCTS'
        )} recomendados`
      )
      dispatch(fetchRecommendedProductsError(errorMsg))
    }
  }
}

const submitRecommendedProduct = product => {
  return async (dispatch, getState) => {
    dispatch(submitRecommendedProductStart())
    const api = await getApi()
    const {
      recommendedProducts: { values }
    } = getState()
    try {
      await api.post(API_ROUTES.RECOMMENDED_PRODUCTS, {
        product_id: product.id,
        order: values.length + 1
      })
      dispatch(submitRecommendedProductSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('CREATE')} ${i18n('THE_MALE').SINGULAR} ${i18n(
          'PRODUCT'
        )} recomendado`
      )
      dispatch(submitRecommendedProductError(errorMsg))
    }
  }
}

const editRecommendedProduct = (recommendationId, pos) => {
  return async dispatch => {
    dispatch(submitRecommendedProductStart())
    const api = await getApi()
    try {
      await api.put(`${API_ROUTES.RECOMMENDED_PRODUCTS}`, {
        id: recommendationId,
        order: pos
      })
      dispatch(submitRecommendedProductSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('EDIT')} la posicion del ${i18n('PRODUCT')}`
      )
      dispatch(submitRecommendedProductError(errorMsg))
    }
  }
}

const deleteRecommendedProduct = recommendationId => {
  return async dispatch => {
    dispatch(submitRecommendedProductStart())
    const api = await getApi()
    try {
      await api.delete(`${API_ROUTES.RECOMMENDED_PRODUCTS}/${recommendationId}`)
      dispatch(submitRecommendedProductSuccess())
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('DELETE')} ${i18n('THE_MALE').SINGULAR} ${i18n(
          'PRODUCT'
        )} recomendado`
      )
      dispatch(submitRecommendedProductError(errorMsg))
    }
  }
}

export {
  fetchRecommendedProducts,
  fetchRecommendedProductsStart,
  fetchRecommendedProductsSuccess,
  fetchRecommendedProductsError,
  submitRecommendedProduct,
  submitRecommendedProductStart,
  submitRecommendedProductSuccess,
  submitRecommendedProductError,
  editRecommendedProduct,
  deleteRecommendedProduct
}
