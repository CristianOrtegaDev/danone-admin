import { handleActions } from 'redux-actions'
import {
  fetchAdministratorsStart,
  fetchAdministratorsSuccess,
  fetchAdministratorsError,
  submitAdminStart,
  submitAdminSuccess,
  submitAdminError
} from 'actions/administrators'

export const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  isSubmitting: false,
  // Pagination control
  page: 0,
  take: 15,
  hasMore: true
}

const reducer = handleActions(
  {
    [fetchAdministratorsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchAdministratorsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchAdministratorsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [submitAdminStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitAdminSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitAdminError]: (state, { payload: { error } }) => ({
      ...state,
      hasMore: false,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
