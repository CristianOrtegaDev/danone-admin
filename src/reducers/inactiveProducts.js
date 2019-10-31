import { handleActions } from 'redux-actions'
import {
  fetchInactiveProductsStart,
  fetchInactiveProductsSuccess,
  fetchInactiveProductsError,
  inactiveProductsReset
} from 'actions/inactiveProducts'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  // Pagination control
  page: 0,
  take: 20,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchInactiveProductsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchInactiveProductsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchInactiveProductsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [inactiveProductsReset]: () => ({ ...defaultState })
  },
  defaultState
)

export default reducer
