import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { message } from 'antd'

export const useAction = <S, T>(
  queryKey: string,
  mutationFn: (agent: S) => Promise<T>,
  successMsg: string,
  errorMsg: string
): UseMutationResult<T, unknown, S> => {
  const qc = useQueryClient()

  return useMutation(mutationFn, {
    onSuccess: () => {
      qc.invalidateQueries(queryKey)
      message.success(successMsg)
    },
    onError: (e) =>
      Promise.resolve(
        message.error(
          `${errorMsg}, reason: ${((e as unknown) as Error).message}`
        )
      ),
    useErrorBoundary: true
  })
}
