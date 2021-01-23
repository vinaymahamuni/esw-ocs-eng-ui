import type { AgentService } from '@tmtsoftware/esw-ts'
import { message } from 'antd'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { smStatusKey } from './queries'

export const useSMAction = <T>(
  mutationFn: (agent: AgentService) => Promise<T>,
  successMsg: string,
  errorMsg: string
): UseMutationResult<T, unknown, AgentService, unknown> => {
  const qc = useQueryClient()

  return useMutation(mutationFn, {
    onSuccess: () => {
      qc.refetchQueries(smStatusKey)
      message.success(successMsg)
    },
    onError: (e) => Promise.resolve(message.error(errorMsg + 'reason:' + e))
  })
}
