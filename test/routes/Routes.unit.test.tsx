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

    const manageInfra = screen.queryAllByText('Manage Infrastructure')
    expect(manageInfra).to.have.length(2)

    const leftClick = { button: 0 }
    userEvent.click(manageInfra[0], leftClick)
    expect(window.location.pathname).equal('/Infrastructure')
  })

  it('Observations route', () => {
    renderWithRouter(
      <App>
        <Routes />
      </App>
    )

    const manageObservations = screen.queryAllByText('Manage Observations')
    expect(manageObservations).to.have.length(2)

    const leftClick = { button: 0 }
    userEvent.click(manageObservations[0], leftClick)
    expect(window.location.pathname).equal('/Observations')
  })

  it('Resources', () => {
    renderWithRouter(
      <App>
        <Routes />
      </App>
    )

    const resources = screen.queryAllByText('Resources')
    expect(resources).to.have.length(2)

    const leftClick = { button: 0 }
    userEvent.click(resources[0], leftClick)
    expect(window.location.pathname).equal('/Resources')
  })

  // it('landing on a bad page', () => {
  //   const history = createMemoryHistory()

  //   renderWithRouter(
  //     <App>
  //       <Routes />
  //     </App>
  //   )
  //   history.push('/some/bad/route')
  //   expect(screen.getByText(/no match/i)).to.exist
  // })
})
