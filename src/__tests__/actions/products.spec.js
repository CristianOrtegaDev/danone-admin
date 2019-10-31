import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import {
  fetchProducts,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsError
} from 'actions/products'
import {
  productsActionStart,
  productsActionSuccess,
  productsActionError,
  successValues
} from '__mocks__/products'

describe('Testing products actions', () => {
  describe('Base actions', () => {
    it('dispatch the start action', () => {
      expect(fetchProductsStart()).toEqual(productsActionStart)
    })
    it('dispatch the success action', () => {
      expect(fetchProductsSuccess(successValues)).toEqual(productsActionSuccess)
    })
    it('dispatch the error action', () => {
      expect(fetchProductsError('error')).toEqual(productsActionError)
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

      const expectedActions = [productsActionStart, productsActionSuccess]

      await store.dispatch(fetchProducts())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatch the error asociated actions', async () => {
      moxios.wait(() => {
        const errorResp = 'error'
        const request = moxios.requests.mostRecent()
        request.reject(errorResp)
      })

      const expectedActions = [productsActionStart, productsActionError]

      await store.dispatch(fetchProducts())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
