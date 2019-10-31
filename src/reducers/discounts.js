import { handleActions } from 'redux-actions'
import {
  fetchDiscountsStart,
  fetchDiscountsSuccess,
  fetchDiscountsError,
  submitDiscountStart,
  submitDiscountSuccess,
  submitDiscountError
} from 'actions/discounts'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  isSubmitting: false,
  page: 1,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchDiscountsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchDiscountsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchDiscountsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [submitDiscountStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitDiscountSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitDiscountError]: (state, { payload: { error } }) => ({
      ...state,
      hasMore: false,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
