import { handleActions } from 'redux-actions'
import {
  fetchOrdersDeliveredStart,
  fetchOrdersDeliveredSuccess,
  fetchOrdersDeliveredError
} from 'actions/ordersDelivered'

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
    [fetchOrdersDeliveredStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchOrdersDeliveredSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchOrdersDeliveredError]: (state, { payload: { error } }) => ({
      ...state,
      hasMore: false,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
