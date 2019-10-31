export const userActionStart = { type: 'FETCH_USERS_START' }

export const successValues = [{ name: 'pepe' }, { name: 'maria' }]

export const userActionSuccess = {
  type: 'FETCH_USERS_SUCCESS',
  payload: { values: successValues }
}

export const userActionError = {
  type: 'FETCH_USERS_ERROR',
  payload: { error: 'invalid data' }
}
