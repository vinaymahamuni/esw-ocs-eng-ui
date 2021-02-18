import type { UseQueryResult } from 'react-query'
import type { ConfigService } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import { ServiceFactoryContext } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { useService } from '../../utils/hooks/useService'

export const useConfigService = (): UseQueryResult<ConfigService> => {
  const { configServiceFactory } = useContext(ServiceFactoryContext)
  return useService('configService', configServiceFactory)
}
