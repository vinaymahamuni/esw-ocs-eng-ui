import { expect } from 'chai'
import { useAgentService } from '../../../../src/features/agent/hooks/useAgentService'
import { renderHook } from '@testing-library/react-hooks/dom'
import {
  getContextWithQueryClientProvider,
  getMockServices
} from '../../../utils/test-utils'

describe('useAgentService', () => {
  it('should return agent service instance | ESW-441', async () => {
    const mockServices = getMockServices()
    const ContextAndQueryClientProvider = getContextWithQueryClientProvider(
      true,
      mockServices.serviceFactoryContext
    )
    const { result, waitFor } = renderHook(() => useAgentService(), {
      wrapper: ContextAndQueryClientProvider
    })

    await waitFor(() => {
      return result.current.isSuccess
    })

    expect(result.current.data).eq(mockServices.instance.agentService)
  })
})
