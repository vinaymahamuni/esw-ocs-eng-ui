import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/home/Home'

const Routes = (): JSX.Element => (
  <Switch>
    <Route path='/' render={() => <Home />} />
  </Switch>
)

export default Routes
