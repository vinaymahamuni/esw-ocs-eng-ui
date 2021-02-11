import React from 'react'
import {
  prettyDOM,
  renderWithAuth,
  screen,
  cleanup
} from '../../utils/test-utils'
import { expect } from 'chai'
import App from '../../../src/containers/app/App' // fixed to absolute path
import { BrowserRouter } from 'react-router-dom'
import Routes from '../../../src/routes'

describe('App page', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render app with layout when user is logged in', async () => {
    renderWithAuth(
      <BrowserRouter>
        <App>
          <Routes />
        </App>
      </BrowserRouter>
    )

    const resources = screen.queryAllByText('Resources')
    const manageObservations = screen.queryAllByText('Manage Observations')
    const manageInfra = screen.queryAllByText('Manage Infrastructure')
    const logoutButton = await screen.findByText('ESW-USER')

    expect(resources).to.have.lengthOf(2)
    expect(manageObservations).to.have.lengthOf(2)
    expect(manageInfra).to.have.lengthOf(2)
    expect(logoutButton).to.exist
  })

  it('should render app without layout when user is not logged in', () => {
    renderWithAuth(
      <BrowserRouter>
        <App>
          <Routes />
        </App>
      </BrowserRouter>,
      false
    )

    const loginButton = screen.queryAllByText('Login')
    expect(loginButton).to.have.lengthOf(1)
  })
})
