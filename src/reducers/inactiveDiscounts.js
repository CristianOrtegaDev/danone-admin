import { handleActions } from 'redux-actions'
import {
  fetchInactiveDiscountsStart,
  fetchInactiveDiscountsSuccess,
  fetchInactiveDiscountsError
} from 'actions/inactiveDiscounts'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  page: 1,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchInactiveDiscountsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchInactiveDiscountsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchInactiveDiscountsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
