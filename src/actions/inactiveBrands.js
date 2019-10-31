import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchInactiveBrandsStart,
  fetchInactiveBrandsSuccess,
  fetchInactiveBrandsError
} = createActions({
  FETCH_INACTIVE_BRANDS_START: () => {},
  FETCH_INACTIVE_BRANDS_SUCCESS: data => ({ data }),
  FETCH_INACTIVE_BRANDS_ERROR: error => ({ error })
})

const fetchInactiveBrands = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchInactiveBrandsStart())
    const api = await getApi()
    let { inactiveBrands } = getState()
    let actualTake = reset === true ? 15 : inactiveBrands.take

    try {
      const response = await api.get(
        `${API_ROUTES.BRANDS_INACTIVE_PAGINATED}/${BASE_PAGE}/${actualTake}`
      )

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 15 : actualTake

      dispatch(fetchInactiveBrandsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_INACTIVE_BRANDS_ERROR'))
      dispatch(fetchInactiveBrandsError(errorMsg))
    }
  }
}

export {
  fetchInactiveBrands,
  fetchInactiveBrandsStart,
  fetchInactiveBrandsSuccess,
  fetchInactiveBrandsError
}
