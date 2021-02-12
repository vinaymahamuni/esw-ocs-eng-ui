import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { ServiceFactoryContext } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'

export const useAgentService = (): UseQueryResult<AgentService, unknown> => {
  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to continue ...')

  const { agentServiceFactory } = useContext(ServiceFactoryContext)

  return useQuery('agentService', () => agentServiceFactory(auth.token), {
    useErrorBoundary: true
  })
}
