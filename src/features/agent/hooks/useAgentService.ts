import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'

export const useAgentService = (): UseQueryResult<AgentService, unknown> => {
  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to continue ...')

  // const agentService =
  //   window.isMocked || !auth
  //     ? AgentService(() => undefined)
  //     : AgentService(auth.token)

  return useQuery('agentService', () => AgentService(auth.token), {
    useErrorBoundary: true
  })
}
