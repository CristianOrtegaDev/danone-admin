import store from 'store'

describe('Testing store module', () => {
  it('returns the provided store functions', () => {
    expect(Object.keys(store)[0]).toBe('dispatch')
    expect(Object.keys(store)[1]).toBe('subscribe')
    expect(Object.keys(store)[2]).toBe('getState')
  })
  it('returns the actual app state', () => {
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    expect(Object.keys(store.getState())).toHaveLength(3)
  })
})
