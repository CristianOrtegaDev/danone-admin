import { createActions } from 'redux-actions'

const { resetResource, selectResource } = createActions({
  RESET_RESOURCE: () => {},
  SELECT_RESOURCE: data => ({ data })
})

const resetSelectedResource = () => dispatch => dispatch(resetResource())

const setSelectedResource = resource => dispatch => dispatch(selectResource({ resource }))

export { setSelectedResource, selectResource, resetSelectedResource, resetResource }
