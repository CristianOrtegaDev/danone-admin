import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { fetchOrders, fetchOrdersStart, fetchOrdersSuccess, fetchOrdersError } from 'actions/orders'
import {
  ordersActionStart,
  ordersActionSuccess,
  ordersActionError,
  successValues
} from '__mocks__/orders'

describe('Testing orders actions', () => {
  describe('Base actions', () => {
    it('dispatch the users start action', () => {
      expect(fetchOrdersStart()).toEqual(ordersActionStart)
    })
    it('dispatch the users success action', () => {
      expect(fetchOrdersSuccess(successValues)).toEqual(ordersActionSuccess)
    })
    it('dispatch the users error action', () => {
      expect(fetchOrdersError('error')).toEqual(ordersActionError)
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

      const expectedActions = [ordersActionStart, ordersActionSuccess]

      await store.dispatch(fetchOrders())

      expect(store.getActions()).toEqual(expectedActions)
    })

    it('dispatch the error asociated actions', async () => {
      moxios.wait(() => {
        const errorResp = 'error'
        const request = moxios.requests.mostRecent()
        request.reject(errorResp)
      })

      const expectedActions = [ordersActionStart, ordersActionError]

      await store.dispatch(fetchOrders())

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
