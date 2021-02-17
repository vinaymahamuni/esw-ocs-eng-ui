import React from 'react'
import { renderWithAuth, screen, cleanup } from '../../utils/test-utils'
import { expect } from 'chai'
import App from '../../../src/containers/app/App' // fixed to absolute path
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../../src/routes'

describe('App page', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render app with layout when user is logged in', async () => {
    renderWithAuth({
      ui: (
        <BrowserRouter>
          <App>
            <Routes />
          </App>
        </BrowserRouter>
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

  it('should render app without layout when user is not logged in', () => {
    renderWithAuth({
      ui: (
        <BrowserRouter>
          <App>
            <Routes />
          </App>
        </BrowserRouter>
      ),
      loggedIn: false
    })

    const loginButton = screen.queryByText('Login')
    expect(loginButton).to.exist
  })
})
