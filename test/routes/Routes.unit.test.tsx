import { screen, renderWithAuth, cleanup } from '../utils/test-utils'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../../src/containers/app/App'
import Routes from '../../src/routes'
import { expect } from 'chai'

const renderWithRouter = (ui: React.ReactElement) => {
  window.history.pushState({}, 'Home page', '/')
  return renderWithAuth(<BrowserRouter>{ui}</BrowserRouter>, true)
}

const leftClick = { button: 0 }
describe('Full app navigation', () => {
  afterEach(() => {
    cleanup()
  })

  it('Infrastructure route', () => {
    renderWithRouter(
      <App>
        <Routes />
      </App>
    )

    const manageInfra = screen.getByRole('ManageInfrastructure')
    expect(manageInfra).to.exist

    userEvent.click(manageInfra, leftClick)
    expect(window.location.pathname).equal('/Infrastructure')
  })

  it('Observations route', () => {
    renderWithRouter(
      <App>
        <Routes />
      </App>
    )

    const manageObservations = screen.getByRole('ManageObservations')
    expect(manageObservations).to.exist

    userEvent.click(manageObservations, leftClick)
    expect(window.location.pathname).equal('/Observations')
  })

  it('Resources', () => {
    renderWithRouter(
      <App>
        <Routes />
      </App>
    )

    const resources = screen.getAllByRole('Resources')
    expect(resources).to.have.length(2)

    userEvent.click(resources[0], leftClick)
    expect(window.location.pathname).equal('/Resources')
  })
})
