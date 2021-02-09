import { CheckLogin } from '@tmtsoftware/esw-ts'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/home/Home'

const LoginError = () => <div>Please login to proceed</div>

const Routes = (): JSX.Element => (
  <Switch>
    <Route
      path='/'
      render={() => (
        // <CheckLogin error={<LoginError />}>
        <Home />
        /* </CheckLogin> */
      )}
    />
  </Switch>
)

export default Routes
