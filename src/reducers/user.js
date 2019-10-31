import { handleActions } from 'redux-actions'
import { updateUserInfo } from 'actions/user'

const defaultState = {}

const reducer = handleActions(
  {
    [updateUserInfo]: (
      state,
      {
        payload: {
          data: { user }
        }
      }
    ) => ({
      ...state,
      ...user
    })
  },
  defaultState
)

export default reducer
