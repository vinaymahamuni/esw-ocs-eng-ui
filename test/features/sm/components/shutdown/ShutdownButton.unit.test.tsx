import React from 'react'
import { getMockServices, renderWithAuth } from '../../../../utils/test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
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

    const { queryAllByText, getByText } = renderWithAuth(
      <ShutdownSMButton />,
      true,
      mockServices.serviceFactoryContext
    )

    await waitFor(() => expect(queryAllByText('Shutdown')).to.length(1))

    //User clicks shutdown button
    fireEvent.click(getByText('Shutdown'))

    //modal will appear with shutdown button
    await waitFor(() =>
      expect(
        queryAllByText('Do you want to shutdown Sequence Manager?')
      ).to.length(1)
    )

    //User clicks modal's shutdown button
    const modalShutdownButton = queryAllByText('Shutdown')[1]
    fireEvent.click(modalShutdownButton)

    await waitFor(() => {
      expect(
        queryAllByText('Successfully shutdown Sequence Manager')
      ).to.length(1)
    })
    verify(agentServiceMock.killComponent(smComponentId)).called()
  })
})
