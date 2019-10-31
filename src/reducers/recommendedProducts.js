import { handleActions } from 'redux-actions'
import {
  fetchRecommendedProductsStart,
  fetchRecommendedProductsSuccess,
  fetchRecommendedProductsError,
  submitRecommendedProductStart,
  submitRecommendedProductSuccess,
  submitRecommendedProductError
} from 'actions/recommendedProducts'

export const defaultState = {
  values: null,
  error: null,
  isFetching: false,
  isSubmitting: false
}

const reducer = handleActions(
  {
    [fetchRecommendedProductsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchRecommendedProductsSuccess]: (state, { payload: { values } }) => ({
      ...state,
      values,
      isFetching: false,
      error: null
    }),
    [fetchRecommendedProductsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [submitRecommendedProductStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitRecommendedProductSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitRecommendedProductError]: (state, { payload: { error } }) => ({
      ...state,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
