import React from 'react'
import { getMockServices, renderWithAuth } from '../../../../utils/test-utils'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
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

    const { getByText, findByRole } = renderWithAuth(
      <SpawnSMButton />,
      true,
      mockServices.serviceFactoryContext
    )

    //User clicks spawn button
    const spawnButton = await findByRole('button', { name: /spawn/i })
    fireEvent.click(spawnButton)

    //modal will appear with spawn button
    await waitFor(
      () =>
        expect(getByText(/choose an agent to spawn sequence manager/i)).to.exist
    )
    const modalDocument = screen.getByRole('document')
    const modalSpawnButton = within(modalDocument).getByRole('button', {
      name: /spawn/i
    })

    //User don't select agent machine and try to spawn SM
    fireEvent.click(modalSpawnButton)
    expect(getByText('Please select agent!')).to.exist

    //User selects agent machine
    fireEvent.click(
      within(modalDocument).getByRole('menuitem', {
        name: agentPrefix.toJSON()
      })
    )

    //User clicks modal's spawn button
    fireEvent.click(modalSpawnButton)

    await waitFor(() => {
      expect(getByText('Successfully spawned Sequence Manager')).to.exist
    })

    const [prefix, expectedConfig, isLocal] = capture(
      agentServiceMock.spawnSequenceManager
    ).first()
    expect(prefix.toJSON()).eq(agentPrefix.toJSON())
    expect(expectedConfig).eq(obsModeConfig)
    expect(isLocal).to.false
  })
})
