import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_TAKE, BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import i18n from 'services/i18n'
import getApi from 'services/api'

const {
  fetchProductsFilteredStart,
  fetchProductsFilteredSuccess,
  fetchProductsFilteredError
} = createActions({
  FETCH_PRODUCTS_FILTERED_START: () => {},
  FETCH_PRODUCTS_FILTERED_SUCCESS: values => ({ values }),
  FETCH_PRODUCTS_FILTERED_ERROR: error => ({ error })
})

const fetchFilteredProducts = () => async dispatch => {
  dispatch(fetchProductsFilteredStart())
  const api = await getApi()
  try {
    const response = await api.get(
      `${API_ROUTES.PRODUCTS_FILTERED_PAGINATED}/${BASE_PAGE}/${BASE_TAKE}`
    )
    dispatch(
      fetchProductsFilteredSuccess({ values: response.data, hasMore: true, take: BASE_TAKE })
    )
  } catch (error) {
    const errorMsg = errorMsgHandler(
      error,
      `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_MALE').PLURAL}  ${i18n(
        'PRODUCTS'
      )} `
    )
    dispatch(fetchProductsFilteredError(errorMsg))
  }
}

const fetchFilteredProductsPaginated = () => async (dispatch, getState) => {
  dispatch(fetchProductsFilteredStart())
  const api = await getApi()
  let { filteredProducts } = getState()
  let actualTake = filteredProducts.take
  try {
    const response = await api.get(
      `${API_ROUTES.PRODUCTS_FILTERED_PAGINATED}/${BASE_PAGE}/${actualTake}`
    )

    // Analizing response
    let hasMore = response.data.length === actualTake

    let take = hasMore ? actualTake + BASE_TAKE : actualTake

    dispatch(fetchProductsFilteredSuccess({ values: response.data, hasMore: true, take }))
  } catch (error) {
    const errorMsg = errorMsgHandler(
      error,
      `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_MALE').PLURAL}  ${i18n(
        'PRODUCTS'
      )} `
    )
    dispatch(fetchProductsFilteredError(errorMsg))
  }
}

export {
  fetchProductsFilteredStart,
  fetchProductsFilteredSuccess,
  fetchProductsFilteredError,
  fetchFilteredProducts,
  fetchFilteredProductsPaginated
}
