import React from 'react'
import { getMockServices, renderWithAuth } from '../../../../utils/test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import { anything, capture, when } from 'ts-mockito'
import type { HttpLocation } from '@tmtsoftware/esw-ts'
import { HttpConnection, Prefix } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import { SpawnSMButton } from '../../../../../src/features/sm/components/spawn/SpawnButton'
import { obsModeConfig } from '../../../../../src/features/sm/constants'

describe('SpawnSMButton', () => {
  it('should spawn the sequence manager | ESW-441', async () => {
    const mockServices = getMockServices()
    const locationServiceMock = mockServices.mock.locationService
    const agentServiceMock = mockServices.mock.agentService
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
    when(
      agentServiceMock.spawnSequenceManager(anything(), obsModeConfig, false)
    ).thenResolve({ _type: 'Spawned' })

    const { queryAllByText, getByText } = renderWithAuth(
      <SpawnSMButton />,
      true,
      mockServices.serviceFactoryContext
    )

    await waitFor(() => expect(queryAllByText('Spawn')).to.length(1))

    //User clicks spawn button
    fireEvent.click(getByText('Spawn'))

    //modal will appear with spawn button
    await waitFor(() =>
      expect(
        queryAllByText('Choose an agent to spawn Sequence Manager')
      ).to.length(1)
    )
    const modalSpawnButton = queryAllByText('Spawn')[1]

    //User don't select agent machine and try to select
    fireEvent.click(modalSpawnButton)
    expect(queryAllByText('Please select agent!')).to.length(1)

    //user selects agent machine
    fireEvent.click(getByText(agentPrefix.toJSON()))

    //User clicks modal's spawn button
    fireEvent.click(modalSpawnButton)

    await waitFor(() => {
      expect(queryAllByText('Successfully spawned Sequence Manager')).to.length(
        1
      )
    })

    const [prefix, expectedConfig, isLocal] = capture(
      agentServiceMock.spawnSequenceManager
    ).first()
    expect(prefix.toJSON()).eq(agentPrefix.toJSON())
    expect(expectedConfig).eq(obsModeConfig)
    expect(isLocal).to.false
  })
})