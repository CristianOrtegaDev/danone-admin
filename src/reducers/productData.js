import { handleActions } from 'redux-actions'
import {
  fetchProductDataStart,
  fetchProductDataSuccess,
  fetchProductDataError
} from 'actions/productData'

export const defaultState = {
  data: null,
  error: null,
  isFetching: false
}

const reducer = handleActions(
  {
    [fetchProductDataStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchProductDataSuccess]: (state, { payload: { data } }) => ({
      ...state,
      data,
      isFetching: false
    }),
    [fetchProductDataError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
