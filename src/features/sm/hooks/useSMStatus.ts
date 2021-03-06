import type { Location, Option } from '@tmtsoftware/esw-ts'
import { useQuery, UseQueryResult } from 'react-query'
import { useServiceFactory } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { smConnection } from '../constants'

export const smStatusKey = 'smStatus'

export const useSMStatus = (): UseQueryResult<Option<Location>, unknown> => {
  const { locationServiceFactory } = useServiceFactory()
  return useQuery(smStatusKey, () =>
    locationServiceFactory().find(smConnection)
  )
}
