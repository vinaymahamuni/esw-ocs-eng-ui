import { useQuery, UseQueryResult } from 'react-query'
import { ProvisionActionQueryKey } from '../../hooks/useProvisionAction'
import { useSMService } from '../hooks/useSMService'

export const useProvisionStatus = (): UseQueryResult<boolean> => {
  const smService = useSMService()

  return useQuery(ProvisionActionQueryKey, async () => {
    if (!smService.data) return false
    //Fixme: useMutation
    const agentStatus = await smService.data.getAgentStatus()
    return (
      agentStatus._type == 'Success' &&
      agentStatus.agentStatus.some((x) => {
        return x.seqCompsStatus.length > 0
      })
    )
  })
}
