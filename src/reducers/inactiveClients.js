import { handleActions } from 'redux-actions'
import {
  fetchInactiveClientsStart,
  fetchInactiveClientsSuccess,
  fetchInactiveClientsError
} from 'actions/inactiveClients'

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
    [fetchInactiveClientsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchInactiveClientsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      ...data,
      isFetching: false,
      error: null
    }),
    [fetchInactiveClientsError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
