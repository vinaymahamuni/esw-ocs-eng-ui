import {
  AgentService,
  AuthContext,
  LocationService,
  Option
} from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { smConnection } from '../constants'

export const useAgentService = (): UseQueryResult<AgentService, unknown> => {
  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to continue ...')

  return useQuery('agentService', () => AgentService(auth.token), {
    useErrorBoundary: true
  })
}

const locationService = LocationService()
export const smStatusKey = 'smStatus'

export const useSMStatus = (): UseQueryResult<Option<Location>, unknown> =>
  useQuery(smStatusKey, () => locationService.find(smConnection))
