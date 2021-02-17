import React from 'react'
import { getMockServices, renderWithAuth } from '../../../../utils/test-utils'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { verify, when } from 'ts-mockito'
import { smComponentId } from '../../../../../src/features/sm/constants'
import { expect } from 'chai'
import { ShutdownSMButton } from '../../../../../src/features/sm/components/shutdown/ShutdownButton'

describe('ShutdownSMButton', () => {
  it('should shutdown the sequence manager | ESW-441', async () => {
    const mockServices = getMockServices()
    const agentServiceMock = mockServices.mock.agentService

    when(agentServiceMock.killComponent(smComponentId)).thenResolve({
      _type: 'Killed'
    })

    const { getByRole, getByText, findByRole } = renderWithAuth({
      ui: <ShutdownSMButton />,
      loggedIn: true,
      mockClients: mockServices.serviceFactoryContext
    })

    const shutdownButton = await findByRole('button', { name: /shutdown/i })

    //User clicks shutdown button
    fireEvent.click(shutdownButton)

    //modal will appear with shutdown button
    await waitFor(() => expect(getByRole('document')).to.exist)
    const modalDocument = screen.getByRole('document')
    const modalShutdownButton = within(modalDocument).getByRole('button', {
      name: /shutdown/i
    })

    //User clicks modal's shutdown button
    fireEvent.click(modalShutdownButton)

    await waitFor(() => {
      expect(getByText('Successfully shutdown Sequence Manager')).to.exist
    })
    verify(agentServiceMock.killComponent(smComponentId)).called()
  })
})
