import type { SequenceManagerService } from '@tmtsoftware/esw-ts'
import type { UseMutationResult } from 'react-query'
import { useAction } from '../../utils/hooks/useMutation'

export const ProvisionActionQueryKey = 'ProvisionAction'

export const useProvisionAction = <T>(
  mutationFn: (agent: SequenceManagerService) => Promise<T>,
  successMsg: string,
  errorMsg: string
): UseMutationResult<T, unknown, SequenceManagerService> =>
  useAction(ProvisionActionQueryKey, mutationFn, successMsg, errorMsg)
