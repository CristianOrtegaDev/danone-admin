import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSuperUserLoggedIn } from 'utils/session'

const SuperUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isSuperUserLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/`,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default SuperUserRoute
