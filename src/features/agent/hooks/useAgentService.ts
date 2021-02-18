import type { AgentService } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import type { UseQueryResult } from 'react-query'
import { ServiceFactoryContext } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { useService } from '../../utils/hooks/useService'

export const useAgentService = (): UseQueryResult<AgentService> => {
  const { agentServiceFactory } = useContext(ServiceFactoryContext)
  return useService('agentService', agentServiceFactory)
}
