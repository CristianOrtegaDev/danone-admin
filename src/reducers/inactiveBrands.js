import { handleActions } from 'redux-actions'
import {
  fetchInactiveBrandsStart,
  fetchInactiveBrandsSuccess,
  fetchInactiveBrandsError
} from 'actions/inactiveBrands'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  // Pagination controls
  page: 0,
  take: 10,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchInactiveBrandsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchInactiveBrandsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchInactiveBrandsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
