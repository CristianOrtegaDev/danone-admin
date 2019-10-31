import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Switch, Route, Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { createBrowserHistory } from 'history'
import PrivateRoute from 'components/PrivateRoute'
import SuperUserRoute from 'components/SuperUserRoute'
import GlobalStyle from 'config/globalStyle'

import theme from 'config/theme'
import store from './store'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Recommendations from 'pages/Recommendations'
import Admins from 'pages/Admins'
import Clients from 'pages/Clients'
import Discounts from 'pages/Discounts'
import Brands from './pages/Brands'

const browserHistory = createBrowserHistory()

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <Fragment>
            <Router history={browserHistory}>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/marcas" component={Brands} />
                <PrivateRoute exact path="/recomendaciones" component={Recommendations} />
                <SuperUserRoute exact path="/admin" component={Admins} />
                <SuperUserRoute exact path="/clientes" component={Clients} />
                <SuperUserRoute exact path="/descuentos" component={Discounts} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Router>
            <GlobalStyle />
          </Fragment>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
