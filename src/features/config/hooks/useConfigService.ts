import type { ConfigService } from '@tmtsoftware/esw-ts'
import type { UseQueryResult } from 'react-query'
import { useServiceFactory } from '../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { useService } from '../../utils/hooks/useService'

export const useConfigService = (): UseQueryResult<ConfigService> => {
  const { configServiceFactory } = useServiceFactory()
  return useService('configService', configServiceFactory)
}
