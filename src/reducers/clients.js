import { handleActions } from 'redux-actions'
import {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsError,
  submitClientStart,
  submitClientSuccess,
  submitClientError
} from 'actions/clients'

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
    [fetchClientsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchClientsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchClientsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    [submitClientStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitClientSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitClientError]: (state, { payload: { error } }) => ({
      ...state,
      hasMore: false,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
