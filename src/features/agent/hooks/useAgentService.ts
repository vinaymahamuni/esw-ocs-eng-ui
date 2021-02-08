import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'

export const useAgentService = (): UseQueryResult<AgentService, unknown> => {
  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to continue ...')

  return useQuery('agentService', () => AgentService(auth.token), {
    useErrorBoundary: true
  })
}
