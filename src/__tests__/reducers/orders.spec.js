import orders, { defaultState } from 'reducers/orders'
import { successValues } from '__mocks__/orders'
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersError } from 'actions/orders'

describe('Testing the orders reducer', () => {
  it('return the initial state', () => {
    expect(orders(defaultState, {})).toEqual(defaultState)
  })
  it('return the isFetching state', () => {
    const action = fetchOrdersStart()
    expect(orders(defaultState, action)).toEqual({
      values: null,
      error: null,
      isFetching: true
    })
  })
  it('return the success state', () => {
    const action = fetchOrdersSuccess(successValues)
    expect(orders(defaultState, action)).toEqual({
      values: successValues,
      error: null,
      isFetching: false
    })
  })
  it('return the error state', () => {
    const action = fetchOrdersError('Error message')
    expect(orders(defaultState, action)).toEqual({
      values: null,
      error: 'Error message',
      isFetching: false
    })
  })
})
