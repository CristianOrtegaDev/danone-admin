import { combineReducers } from 'redux'

import auth from './auth'
import brands from './brands'
import inactiveBrands from './inactiveBrands'
import orderDetail from './orderDetail'
import ordersPendent from './ordersPendent'
import ordersDelivered from './ordersDelivered'
import products from './products'
import inactiveProducts from './inactiveProducts'
import browser from './browser'
import user from './user'
import selectedResource from './selectedResource'
import recommendedProducts from './recommendedProducts'
import filteredProducts from './filteredProducts'
import productData from './productData'
import administrators from './administrators'
import inactiveAdministrators from './inactiveAdministrators'
import clients from './clients'
import inactiveClients from './inactiveClients'
import discounts from './discounts'
import inactiveDiscounts from './inactiveDiscounts'

const rootReducer = combineReducers({
  auth,
  browser,
  brands,
  inactiveBrands,
  orderDetail,
  ordersPendent,
  ordersDelivered,
  products,
  inactiveProducts,
  selectedResource,
  recommendedProducts,
  user,
  filteredProducts,
  productData,
  administrators,
  inactiveAdministrators,
  clients,
  inactiveClients,
  discounts,
  inactiveDiscounts
})

export default rootReducer
