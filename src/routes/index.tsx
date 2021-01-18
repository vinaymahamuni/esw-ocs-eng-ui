import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/home/Home'

const Routes = (): JSX.Element => (
  <Switch>
    <Route path='/users' component={Users} />
    <Route path='/' exact={true} component={Home} />
  </Switch>
)

export default Routes

const Users = (): JSX.Element => <div>Hello user i am here</div>
