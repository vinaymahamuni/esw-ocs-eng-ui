import type { AkkaLocation, Option } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { ServiceFactoryContext } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { smConnection } from '../constants'

export const smStatusKey = 'smStatus'

export const useSMStatus = (): UseQueryResult<
  Option<AkkaLocation>,
  unknown
> => {
  const { locationServiceFactory } = useContext(ServiceFactoryContext)
  return useQuery(smStatusKey, () =>
    locationServiceFactory().find(smConnection)
  )
}
