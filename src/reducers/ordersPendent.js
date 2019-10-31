import { handleActions } from 'redux-actions'
import {
  fetchOrdersPendentStart,
  fetchOrdersPendentSuccess,
  fetchOrdersPendentError
} from 'actions/ordersPendent'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  // Pagination control
  page: 0,
  take: 15,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchOrdersPendentStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchOrdersPendentSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchOrdersPendentError]: (state, { payload: { error } }) => ({
      ...state,
      hasMore: false,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
