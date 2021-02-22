import type { SequenceManagerService } from '@tmtsoftware/esw-ts'
import type { UseQueryResult } from 'react-query'
import { useServiceFactory } from '../../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { useService } from '../../../utils/hooks/useService'

export const useSMService = (): UseQueryResult<SequenceManagerService> => {
  const { smServiceFactory } = useServiceFactory()
  return useService('smService', smServiceFactory)
}
