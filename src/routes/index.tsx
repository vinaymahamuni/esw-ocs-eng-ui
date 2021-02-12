import CheckLogin from './CheckLogin'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/home/Home'

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
  </Switch>
)

export default Routes
