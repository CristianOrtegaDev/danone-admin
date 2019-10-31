import products, { defaultState } from 'reducers/products'
import { successValues } from '__mocks__/products'
import { fetchProductsStart, fetchProductsSuccess, fetchProductsError } from 'actions/products'

describe('Testing the orders reducer', () => {
  it('return the initial state', () => {
    expect(products(defaultState, {})).toEqual(defaultState)
  })
  it('return the isFetching state', () => {
    const action = fetchProductsStart()
    expect(products(defaultState, action)).toEqual({
      values: null,
      error: null,
      isFetching: true
    })
  })
  it('return the success state', () => {
    const action = fetchProductsSuccess(successValues)
    expect(products(defaultState, action)).toEqual({
      values: successValues,
      error: null,
      isFetching: false
    })
  })
  it('return the error state', () => {
    const action = fetchProductsError('Error message')
    expect(products(defaultState, action)).toEqual({
      values: null,
      error: 'Error message',
      isFetching: false
    })
  })
})
