export const brandsActionStart = { type: 'FETCH_BRANDS_START' }

export const successValues = [{ id: 1 }, { id: 2 }]

export const brandsActionSuccess = {
  type: 'FETCH_BRANDS_SUCCESS',
  payload: { values: successValues }
}

export const brandsActionError = {
  type: 'FETCH_BRANDS_ERROR',
  payload: { error: 'error' }
}
