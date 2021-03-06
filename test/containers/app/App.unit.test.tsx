import { expect } from 'chai'
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import App from '../../../src/containers/app/App' // fixed to absolute path
import Routes from '../../../src/routes'
import { renderWithAuth, screen, cleanup } from '../../utils/test-utils'

describe('App page', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render app with layout when user is logged in | ESW-441', async () => {
    renderWithAuth({
      ui: (
        <Router>
          <App>
            <Routes />
          </App>
        </Router>
      )
    })

    const resources = screen.queryAllByText('Resources')
    const manageObservations = screen.queryAllByText('Manage Observations')
    const manageInfra = screen.queryAllByText('Manage Infrastructure')
    const logoutButton = await screen.findByText('ESW-USER')

    expect(resources).to.have.length(2)
    expect(manageObservations).to.have.length(2)
    expect(manageInfra).to.have.length(2)
    expect(logoutButton).to.exist
  })

  it('should render app without layout when user is not logged in | ESW-441', () => {
    renderWithAuth({
      ui: (
        <Router>
          <App>
            <Routes />
          </App>
        </Router>
      ),
      loggedIn: false
    })

    const loginButton = screen.queryByText('Login')
    expect(loginButton).to.exist
  })
})
