import { useContext } from 'react'
import type { AkkaLocation, Option } from '@tmtsoftware/esw-ts'
import { useQuery, UseQueryResult } from 'react-query'
import { smConnection } from '../constants'
import { ServiceFactoryContext } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'

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
