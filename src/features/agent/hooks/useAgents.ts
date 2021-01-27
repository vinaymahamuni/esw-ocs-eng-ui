import type { Prefix } from '@tmtsoftware/esw-ts'
import { useQuery, UseQueryResult } from 'react-query'
import { locationService } from '../../location/instance'

export const useAgents = (): UseQueryResult<Prefix[], unknown> => {
  const getAllAgentPrefix = async () => {
    const agents = await locationService.listByComponentType('Machine')
    return agents.map((l) => l.connection.prefix)
  }

  return useQuery('listAgents', getAllAgentPrefix)
}
