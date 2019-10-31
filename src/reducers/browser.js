import { createResponsiveStateReducer } from 'redux-responsive'
import { breakpoints } from 'config/media-queries'

export default createResponsiveStateReducer(breakpoints, { infinity: 'widescreen' })
