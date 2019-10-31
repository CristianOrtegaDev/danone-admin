import { handleActions } from 'redux-actions'
import {
  fetchInactiveAdministratorsStart,
  fetchInactiveAdministratorsSuccess,
  fetchInactiveAdministratorsError
} from 'actions/inactiveAdministrators'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  // Pagination control
  page: 0,
  take: 10,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchInactiveAdministratorsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchInactiveAdministratorsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchInactiveAdministratorsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
