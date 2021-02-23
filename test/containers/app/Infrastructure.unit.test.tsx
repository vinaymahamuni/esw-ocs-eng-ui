import type { HttpLocation } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import React from 'react'
import { when } from 'ts-mockito'
import Infrastructure from '../../../src/containers/infrastructure/Infrastructure'
import { smConnection } from '../../../src/features/sm/constants'
import {
  cleanup,
  getMockServices,
  renderWithAuth,
  screen,
  waitFor
} from '../../utils/test-utils'

describe('Infrastructure page', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render infrastructure page | ESW-442', async () => {
    renderWithAuth({
      ui: <Infrastructure />
    })

    const subtitle = screen.getByText(/sequence manager/i)
    const header = screen.getByText(/manage infrastructure/i)

    expect(subtitle).to.exist
    expect(header).to.exist
    expect(screen.queryByText(/Loading/i)).to.exist

    await waitFor(() => {
      expect(screen.getByText(/service down/i)).to.exist
    })
  })

  it('should render running status if sequence manager is up| ESW-442', async () => {
    const mockServices = getMockServices()
    const locationServiceMock = mockServices.mock.locationService

    const smLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: smConnection,
      uri: 'url',
      metadata: { agentPrefix: 'ESW.primary' }
    }

    when(locationServiceMock.find(smConnection)).thenResolve(smLocation)

    renderWithAuth({
      ui: <Infrastructure />,
      loggedIn: true,
      mockClients: mockServices.serviceFactoryContext
    })
    expect(screen.queryByText(/Loading/i)).to.exist
    await waitFor(() => {
      expect(screen.queryByText(/Running on ESW.primary/i)).to.exist
    })
  })
})
