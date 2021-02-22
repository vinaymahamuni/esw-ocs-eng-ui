import { HttpConnection, HttpLocation, Prefix } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import React from 'react'
import { when } from 'ts-mockito'
import Infrastructure from '../../../src/containers/infrastructure/Infrastructure'
import { smConnection } from '../../../src/features/sm/constants'
import {
  renderWithAuth,
  screen,
  cleanup,
  getMockServices,
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
    const serviceDownStatus = screen.getByText(/service down/i)
    const header = screen.getByText(/manage infrastructure/i)

    expect(subtitle).to.exist
    expect(serviceDownStatus).to.exist
    expect(header).to.exist
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

    await waitFor(() => {
      expect(screen.queryByText(/Running on ESW.primary/i)).to.exist
    })
  })
})
