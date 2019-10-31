import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsError,
  submitBrandStart,
  submitBrandSuccess,
  submitBrandError
} = createActions({
  FETCH_BRANDS_START: () => {},
  FETCH_BRANDS_SUCCESS: data => ({ data }),
  FETCH_BRANDS_ERROR: error => ({ error }),
  SUBMIT_BRAND_START: () => {},
  SUBMIT_BRAND_SUCCESS: data => ({ data }),
  SUBMIT_BRAND_ERROR: error => ({ error })
})

const fetchBrands = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchBrandsStart())
    const api = await getApi()
    let { brands } = getState()

    let actualTake = reset === true ? 15 : brands.take

    try {
      const response = await api.get(`${API_ROUTES.BRANDS_PAGINATED}/${BASE_PAGE}/${actualTake}`)

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 15 : actualTake

      dispatch(fetchBrandsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('OBTAIN')} ${i18n('THE_FEMALE').PLURAL} ${i18n(
          'BRANDS'
        )}`
      )
      dispatch(fetchBrandsError(errorMsg))
    }
  }
}

const submitBrand = brand => {
  return async dispatch => {
    dispatch(submitBrandStart())
    const api = await getApi()
    try {
      const response = await api.post(API_ROUTES.BRANDS, brand)
      dispatch(submitBrandSuccess(response))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('CREATE')} ${i18n('THE_FEMALE').SINGULAR} ${i18n(
          'BRAND'
        )}`
      )
      dispatch(submitBrandError(errorMsg))
    }
  }
}

const deleteBrand = brandId => {
  return async dispatch => {
    dispatch(submitBrandStart())
    const api = await getApi()
    try {
      const response = await api.delete(`${API_ROUTES.BRANDS}/${brandId}`)
      dispatch(submitBrandSuccess(response))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('DELETE')} ${i18n('THE_FEMALE').SINGULAR} ${i18n(
          'BRAND'
        )}`
      )
      dispatch(submitBrandError(errorMsg))
    }
  }
}

const activateBrand = brandId => {
  return async dispatch => {
    dispatch(submitBrandStart())
    const api = await getApi()
    try {
      const response = await api.patch(`${API_ROUTES.BRANDS}/activate/${brandId}`)
      dispatch(submitBrandSuccess(response))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('ACTIVATE')} ${i18n('THE_FEMALE').SINGULAR} ${i18n(
          'BRAND'
        )}`
      )
      dispatch(submitBrandError(errorMsg))
    }
  }
}

const editBrand = (brandId, brand) => {
  return async dispatch => {
    dispatch(submitBrandStart())
    const api = await getApi()
    try {
      brand.id = brandId
      const response = await api.put(API_ROUTES.BRANDS, brand)
      dispatch(submitBrandSuccess(response))
    } catch (error) {
      const errorMsg = errorMsgHandler(
        error,
        `${i18n('ERRORS').WE_COULD_NOT} ${i18n('EDIT')} ${i18n('THE_FEMALE').SINGULAR} ${i18n(
          'BRAND'
        )}`
      )
      dispatch(submitBrandError(errorMsg))
    }
  }
}

export {
  fetchBrands,
  fetchBrandsStart,
  fetchBrandsSuccess,
  fetchBrandsError,
  submitBrand,
  submitBrandStart,
  submitBrandSuccess,
  submitBrandError,
  deleteBrand,
  activateBrand,
  editBrand
}
