import { handleActions } from 'redux-actions'
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError,
  submitProductStart,
  submitProductSuccess,
  submitProductError,
  productsReset
} from 'actions/products'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  isSubmitting: false,
  // Pagination control
  page: 0,
  take: 20,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchProductsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchProductsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchProductsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [submitProductStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitProductSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitProductError]: (state, { payload: { error } }) => ({
      ...state,
      isSubmitting: false,
      error
    }),
    [productsReset]: () => ({ ...defaultState })
  },
  defaultState
)

export default reducer
