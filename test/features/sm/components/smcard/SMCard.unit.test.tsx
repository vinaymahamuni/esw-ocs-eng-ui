import React from 'react'
import { getMockServices, renderWithAuth } from '../../../../utils/test-utils'
import { waitFor } from '@testing-library/react'
import { verify, when } from 'ts-mockito'
import { smConnection } from '../../../../../src/features/sm/constants'
import type { HttpLocation } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import SMCard from '../../../../../src/features/sm/components/smcard/SMCard'
import { HttpConnection, Prefix } from '@tmtsoftware/esw-ts'

describe('SMCard', () => {
  it('should show Spawn button if Sequence Manager is not spawned | ESW-441', async () => {
    const mockServices = getMockServices()
    const locationServiceMock = mockServices.mock.locationService
    const agentPrefix = new Prefix('ESW', 'ESW.Machine1')
    const agentLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: HttpConnection(agentPrefix, 'Service'),
      uri: 'url',
      metadata: {}
    }

    when(locationServiceMock.listByComponentType('Machine')).thenResolve([
      agentLocation
    ])
    when(locationServiceMock.find(smConnection)).thenResolve(undefined)

    const { getByRole, queryByRole } = renderWithAuth({
      ui: <SMCard />,
      loggedIn: true,
      mockClients: mockServices.serviceFactoryContext
    })

    await waitFor(
      () => expect(queryByRole('button', { name: /shutdown/i })).to.null
    )
    await waitFor(
      () => expect(getByRole('button', { name: /spawn/i })).to.exist
    )
    verify(locationServiceMock.find(smConnection)).called()
  })

  it('should show Shutdown button if Sequence Manager is already spawned | ESW-441', async () => {
    const mockServices = getMockServices()
    const locationServiceMock = mockServices.mock.locationService
    const agentPrefix = new Prefix('ESW', 'ESW.Machine1')
    const agentLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: HttpConnection(agentPrefix, 'Service'),
      uri: 'url',
      metadata: {}
    }

    when(locationServiceMock.listByComponentType('Machine')).thenResolve([
      agentLocation
    ])
    const smLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: smConnection,
      uri: 'url',
      metadata: {}
    }
    when(locationServiceMock.find(smConnection)).thenResolve(smLocation)

    const { queryByRole, getByRole } = renderWithAuth({
      ui: <SMCard />,
      loggedIn: true,
      mockClients: mockServices.serviceFactoryContext
    })

    await waitFor(
      () => expect(queryByRole('button', { name: /spawn/i })).to.null
    )
    await waitFor(
      () => expect(getByRole('button', { name: /shutdown/i })).to.exist
    )
    verify(locationServiceMock.find(smConnection)).called()
  })
})
