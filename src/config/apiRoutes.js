const getBaseUrl = () => {
  // PROD ENVIROMENT
  if (process.env.REACT_APP_ENVIROMENT === `prod`) {
    return `PROD_URL`
  }
  // STAGING ENVIROMENT
  if (process.env.REACT_APP_ENVIROMENT === `staging`) {
    return `STAGING_URL`
  }
  // DEV ENVIROMENT / DEFAULT ENVIROMENT
  return `http://danonepedidosapidockerstartup-723452902.us-east-2.elb.amazonaws.com`
}

const apiRoute = `/api`

const API_ROUTES = {
  BASE_URL: getBaseUrl(),
  LOGIN: `${apiRoute}/cognito-admin/login`,
  REFRESH_TOKEN: `${apiRoute}/cognito-admin/refresh-token`,
  USERS: `${apiRoute}/users`,
  BRANDS: `${apiRoute}/brand-admin`,
  BRANDS_PAGINATED: `${apiRoute}/brand-admin/paginated`,
  BRANDS_INACTIVE_PAGINATED: `${apiRoute}/brand-admin/inactive`,
  ORDER: `${apiRoute}/request-admin`,
  ORDERS_PENDENT: `${apiRoute}/request-admin/pending/paginated`,
  ORDERS_DELIVERED: `${apiRoute}/request-admin/history/paginated`,
  PRODUCTS: `${apiRoute}/product-admin`,
  PRODUCT_BRAND: `${apiRoute}/product-admin/brand`,
  PRODUCTS_SEARCH: `${apiRoute}/product-admin/search`,
  RECOMMENDED_PRODUCTS: `${apiRoute}/recommended-product-admin`,
  RECOMMENDED_PRODUCTS_PAGINATED: `${apiRoute}/recommended-product-admin/paginated`,
  DISCOUNT: `${apiRoute}/discount-admin`,
  DISCOUNTS_PAGINATED: `${apiRoute}/discount-admin/paginated`,
  DISCOUNTS_PAGINATED_INACTIVE: `${apiRoute}/discount-admin/paginated/inactive`,
  ACTIVATE_DISCOUNT: `${apiRoute}/discount-admin/activate`,
  ADMINISTRATOR: `/admin-administrator`,
  ACTIVATE_ADMINISTRATOR: `/admin-administrator/activate`,
  ADMINISTRATORS_PAGINATED: `/admin-administrator/paginated`,
  CLIENT: '/admin-client',
  CLIENTS_PAGINATED: '/admin-client/paginated',
  ACTIVATE_CLIENT: '/admin-client/activate'
}

export default API_ROUTES
