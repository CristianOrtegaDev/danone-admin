import brands, { defaultState } from 'reducers/brands'
import { successValues } from '__mocks__/brands'
import { fetchBrandsStart, fetchBrandsSuccess, fetchBrandsError } from 'actions/brands'

describe('Testing brands reducer', () => {
  it('return the initial state', () => {
    expect(brands(defaultState, {})).toEqual(defaultState)
  })
  it('return the isFetching state', () => {
    const action = fetchBrandsStart()
    expect(brands(defaultState, action)).toEqual({
      values: null,
      error: null,
      isFetching: true
    })
  })
  it('return the success state', () => {
    const action = fetchBrandsSuccess(successValues)
    expect(brands(defaultState, action)).toEqual({
      values: successValues,
      error: null,
      isFetching: false
    })
  })
  it('return the error state', () => {
    const action = fetchBrandsError('Error message')
    expect(brands(defaultState, action)).toEqual({
      values: null,
      error: 'Error message',
      isFetching: false
    })
  })
})
