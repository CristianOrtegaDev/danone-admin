import { createActions } from 'redux-actions'
import API_ROUTES from 'config/apiRoutes'
import { BASE_PAGE } from 'constants/pagination'
import { errorMsgHandler } from 'utils/errorManager'
import getApi from 'services/api'
import i18n from 'services/i18n'

const {
  fetchInactiveAdministratorsStart,
  fetchInactiveAdministratorsSuccess,
  fetchInactiveAdministratorsError
} = createActions({
  FETCH_INACTIVE_ADMINISTRATORS_START: () => {},
  FETCH_INACTIVE_ADMINISTRATORS_SUCCESS: data => ({ data }),
  FETCH_INACTIVE_ADMINISTRATORS_ERROR: error => ({ error })
})

const fetchInactiveAdministrators = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchInactiveAdministratorsStart())
    const api = await getApi()
    let { inactiveAdministrators } = getState()
    let actualTake = reset === true ? 10 : inactiveAdministrators.take

    try {
      const response = await api.get(
        `${API_ROUTES.ADMINISTRATORS_PAGINATED}/${BASE_PAGE}/${actualTake}/inactives`
      )

      // Analizing response
      let hasMore = response.data.length === actualTake
      let take = hasMore ? actualTake + 10 : actualTake

      dispatch(fetchInactiveAdministratorsSuccess({ values: response.data, hasMore, take }))
    } catch (error) {
      const errorMsg = errorMsgHandler(error, i18n('GET_ADMINS_ERROR'))
      dispatch(fetchInactiveAdministratorsError(errorMsg))
    }
  }
}

export {
  fetchInactiveAdministrators,
  fetchInactiveAdministratorsStart,
  fetchInactiveAdministratorsSuccess,
  fetchInactiveAdministratorsError
}
