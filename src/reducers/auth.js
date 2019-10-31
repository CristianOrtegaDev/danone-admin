import { handleActions } from 'redux-actions'
import { authStart, authSuccess, authError } from 'actions/auth'

export const defaultState = {
  isFetching: false,
  isUserLogged: null,
  error: null
}

const reducer = handleActions(
  {
    [authStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [authSuccess]: (state, { payload: { isUserLogged } }) => ({
      ...state,
      isUserLogged,
      isFetching: false,
      error: null
    }),
    [authError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
