import { createActions } from 'redux-actions'

const { updateUserInfo } = createActions({
  UPDATE_USER_INFO_REDUCER: user => ({ user })
})

const updateUser = user => dispatch => dispatch(updateUserInfo({ user }))

export { updateUser, updateUserInfo }
