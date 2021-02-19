import type { SequenceManagerService } from '@tmtsoftware/esw-ts'
import { useContext } from 'react'
import type { UseQueryResult } from 'react-query'
import { ServiceFactoryContext } from '../../../../contexts/serviceFactoryContext/ServiceFactoryContext'
import { useService } from '../../../utils/hooks/useService'

export const useSMService = (): UseQueryResult<SequenceManagerService> => {
  const { smServiceFactory } = useContext(ServiceFactoryContext)
  return useService('smService', smServiceFactory)
}
