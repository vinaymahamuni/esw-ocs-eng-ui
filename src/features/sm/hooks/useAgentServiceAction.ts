import type { AgentService } from '@tmtsoftware/esw-ts'
import type { UseMutationResult } from 'react-query'
import { useAction } from '../../utils/hooks/useAction'
import { smStatusKey } from './useSMStatus'

export const useAgentServiceAction = <T>(
  mutationFn: (agent: AgentService) => Promise<T>,
  successMsg: string,
  errorMsg: string
): UseMutationResult<T, unknown, AgentService> =>
  useAction(smStatusKey, mutationFn, successMsg, errorMsg)
