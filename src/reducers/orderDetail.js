import { handleActions } from 'redux-actions'
import {
  fetchOrderDetailStart,
  fetchOrderDetailSuccess,
  fetchOrderDetailError,
  resetOrderDetailReducer
} from 'actions/orderDetail'

export const defaultState = {
  data: null,
  error: null,
  isFetching: false
}

const reducer = handleActions(
  {
    [fetchOrderDetailStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchOrderDetailSuccess]: (state, { payload: { data } }) => ({
      ...state,
      data,
      isFetching: false,
      error: null
    }),
    [fetchOrderDetailError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [resetOrderDetailReducer]: () => ({
      ...defaultState
    })
  },
  defaultState
)

export default reducer
