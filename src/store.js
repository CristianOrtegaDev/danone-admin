import { createStore, applyMiddleware, compose } from 'redux'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { cacheReducerReader } from 'utils/session'
import thunk from 'redux-thunk'
import reducers from 'reducers'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const store = createStore(
  reducers,
  cacheReducerReader(),
  composeEnhancers(responsiveStoreEnhancer, applyMiddleware(thunk))
)

export default store
