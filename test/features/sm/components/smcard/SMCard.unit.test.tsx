import React from 'react'
import { getMockServices, renderWithAuth } from '../../../../utils/test-utils'
import { waitFor } from '@testing-library/react'
import { verify, when } from 'ts-mockito'
import { smConnection } from '../../../../../src/features/sm/constants'
import type { HttpLocation } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import SMCard from '../../../../../src/features/sm/components/smcard/SMCard'

describe('SMCard', () => {
  it('should show Spawn button if Sequence Manager is not spawned | ESW-441', async () => {
    const mockServices = getMockServices()
    const locationServiceMock = mockServices.mock.locationService
    when(locationServiceMock.find(smConnection)).thenResolve(undefined)

    const { queryAllByText } = renderWithAuth(
      <SMCard />,
      true,
      mockServices.serviceFactoryContext
    )

    await waitFor(() => expect(queryAllByText('Shutdown')).to.length(0))
    await waitFor(() => expect(queryAllByText('Spawn')).to.length(1))
    verify(locationServiceMock.find(smConnection)).called()
  })

  it('should show Shutdown button if Sequence Manager is already spawned | ESW-441', async () => {
    const mockServices = getMockServices()
    const locationServiceMock = mockServices.mock.locationService
    const smLocation: HttpLocation = {
      _type: 'HttpLocation',
      connection: smConnection,
      uri: 'url',
      metadata: {}
    }
    when(locationServiceMock.find(smConnection)).thenResolve(smLocation)

    const { queryAllByText } = renderWithAuth(
      <SMCard />,
      true,
      mockServices.serviceFactoryContext
    )

    await waitFor(() => expect(queryAllByText('Shutdown')).to.length(1))
    await waitFor(() => expect(queryAllByText('Spawn')).to.length(0))
    verify(locationServiceMock.find(smConnection)).called()
  })
})
