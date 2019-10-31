export const productsActionStart = { type: 'FETCH_PRODUCTS_START' }

export const successValues = [{ id: 1 }, { id: 2 }]

export const productsActionSuccess = {
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { values: successValues }
}

export const productsActionError = {
  type: 'FETCH_PRODUCTS_ERROR',
  payload: { error: 'error' }
}
