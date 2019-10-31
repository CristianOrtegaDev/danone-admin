import { handleActions } from 'redux-actions'
import { BASE_TAKE } from 'constants/pagination'
import {
  fetchProductsFilteredStart,
  fetchProductsFilteredSuccess,
  fetchProductsFilteredError
} from 'actions/filteredProducts'

export const defaultState = {
  values: null,
  error: null,
  isFetching: false,
  // Pagination control
  take: BASE_TAKE,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchProductsFilteredStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchProductsFilteredSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchProductsFilteredError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
