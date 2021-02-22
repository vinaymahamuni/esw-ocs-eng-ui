import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/home/Home'
import Infrastructure from '../containers/infrastructure/Infrastructure'
import CheckLogin from './CheckLogin'
import NoMatch from './NoMatch'

const LoginError = () => <div>User not logged in!!!</div>

const Routes = (): JSX.Element => {
  return (
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
      <Route path='/*' render={() => <NoMatch />} />
    </Switch>
  )
}

export default Routes
