import React, { useCallback, useState } from 'react'
import { expect } from 'chai'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useAgentService } from '../../../../src/features/agent/hooks/useAgentService'
import { renderHook, act } from '@testing-library/react-hooks/dom'
import {
  getContextAndQueryClientProvider,
  getMockServices
} from '../../../utils/test-utils'

describe('useAgentService', () => {
  it('should render some element', async () => {
    const mockServices = getMockServices()
    const ContextAndQueryClientProvider = getContextAndQueryClientProvider(
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
