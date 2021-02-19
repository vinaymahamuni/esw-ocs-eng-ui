import CheckLogin from './CheckLogin'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/home/Home'
import NoMatch from './NoMatch'
import Infrastructure from '../containers/infrastructure/Infrastructure'

const LoginError = () => <div>User not logged in!!!</div>

const Routes = (): JSX.Element => (
  <Switch>
    <Route
      exact
      path='/'
      render={() => (
        <CheckLogin fallbackComponent={<LoginError />}>
          <Home />
        </CheckLogin>
      )}
    />

    <Route
      path='/Infrastructure'
      render={() => (
        <CheckLogin fallbackComponent={<LoginError />}>
          <Infrastructure />
        </CheckLogin>
      )}
    />
    <Route path='*'>
      <NoMatch />
    </Route>
  </Switch>
)

export default Routes
