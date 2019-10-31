export const ordersActionStart = { type: 'FETCH_ORDERS_START' }

export const successValues = [{ id: 1 }, { id: 2 }]

export const ordersActionSuccess = {
  type: 'FETCH_ORDERS_SUCCESS',
  payload: { values: successValues }
}

export const ordersActionError = {
  type: 'FETCH_ORDERS_ERROR',
  payload: { error: 'error' }
}
