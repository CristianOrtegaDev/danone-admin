import { handleActions } from 'redux-actions'
import {
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsError,
  submitBrandStart,
  submitBrandSuccess,
  submitBrandError
} from 'actions/brands'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  isSubmitting: false,
  // Pagination control
  page: 0,
  take: 15,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchBrandsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchBrandsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchBrandsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [submitBrandStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitBrandSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitBrandError]: (state, { payload: { error } }) => ({
      ...state,
      hasMore: false,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
