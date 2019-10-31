import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isUserLoggedIn } from 'utils/session'
import i18n from 'services/i18n'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/${i18n('LOGIN')}`,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default PrivateRoute
