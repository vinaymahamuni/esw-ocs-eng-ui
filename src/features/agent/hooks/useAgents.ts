import type { Prefix } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { ServiceFactoryContext } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'

export const useAgents = (): UseQueryResult<Prefix[], unknown> => {
  const { locationServiceFactory } = useContext(ServiceFactoryContext)
  const getAllAgentPrefix = async () => {
    const agents = await locationServiceFactory().listByComponentType('Machine')
    return agents.map((l) => l.connection.prefix)
  }

  return useQuery('listAgents', getAllAgentPrefix)
}
