import { createContext } from 'react'
import {
  AgentService,
  LocationService,
  TokenFactory
} from '@tmtsoftware/esw-ts'

export interface ServiceFactoryContextType {
  agentServiceFactory: (tokenFactory: TokenFactory) => Promise<AgentService>
  locationServiceFactory: () => LocationService
}

const serviceFactoryContextState: ServiceFactoryContextType = {
  agentServiceFactory: (tokenFactory) => AgentService(tokenFactory),
  locationServiceFactory: () => LocationService()
}

const ServiceFactoryContext = createContext<ServiceFactoryContextType>(
  serviceFactoryContextState
)

export { ServiceFactoryContext, serviceFactoryContextState }
