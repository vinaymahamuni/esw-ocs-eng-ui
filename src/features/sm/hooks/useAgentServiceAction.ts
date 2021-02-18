import type { AgentService } from '@tmtsoftware/esw-ts'
import type { UseMutationResult } from 'react-query'
import { smStatusKey } from './useSMStatus'
import { useAction } from '../../utils/hooks/useMutation'

export const useAgentServiceAction = <T>(
  mutationFn: (agent: AgentService) => Promise<T>,
  successMsg: string,
  errorMsg: string
): UseMutationResult<T, unknown, AgentService> =>
  useAction(smStatusKey, mutationFn, successMsg, errorMsg)
