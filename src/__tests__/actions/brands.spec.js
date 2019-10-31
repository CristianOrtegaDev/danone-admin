import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { fetchBrands, fetchBrandsStart, fetchBrandsSuccess, fetchBrandsError } from 'actions/Brands'
import {
  brandsActionStart,
  brandsActionSuccess,
  brandsActionError,
  successValues
} from '__mocks__/brands'

describe('Testing brands actions', () => {
  describe('Base actions', () => {
    it('dispatch the orders start action', () => {
      expect(fetchBrandsStart()).toEqual(brandsActionStart)
    })
    it('dispatch the orders success action', () => {
      expect(fetchBrandsSuccess(successValues)).toEqual(brandsActionSuccess)
    })
    it('dispatch the orders error action', () => {
      expect(fetchBrandsError('error')).toEqual(brandsActionError)
    })
  })

  describe('Async actions', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)

    let store = {}

    beforeEach(function() {
      moxios.install()
      store = mockStore({})
    })

    afterEach(function() {
      moxios.uninstall()
    })

    it('dispatch the success asociated actions', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: successValues
        })
      })

      const expectedActions = [brandsActionStart, brandsActionSuccess]

      await store.dispatch(fetchBrands())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatch the error asociated actions', async () => {
      moxios.wait(() => {
        const errorResp = 'error'
        const request = moxios.requests.mostRecent()
        request.reject(errorResp)
      })

      const expectedActions = [brandsActionStart, brandsActionError]

      await store.dispatch(fetchBrands())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
