import { createContext } from 'react'
import {
  AgentService,
  ConfigService,
  LocationService,
  SequenceManagerService,
  TokenFactory
} from '@tmtsoftware/esw-ts'

export interface ServiceFactoryContextType {
  locationServiceFactory: () => LocationService
  agentServiceFactory: (tokenFactory: TokenFactory) => Promise<AgentService>
  configServiceFactory: (tokenFactory: TokenFactory) => Promise<ConfigService>
  smServiceFactory: (
    tokenFactory: TokenFactory
  ) => Promise<SequenceManagerService>
}

const serviceFactoryContextState: ServiceFactoryContextType = {
  locationServiceFactory: () => LocationService(),
  agentServiceFactory: (tokenFactory) => AgentService(tokenFactory),
  configServiceFactory: (tokenFactory: TokenFactory) =>
    ConfigService(tokenFactory),
  smServiceFactory: (tokenFactory: TokenFactory) =>
    SequenceManagerService(tokenFactory)
}

const ServiceFactoryContext = createContext<ServiceFactoryContextType>(
  serviceFactoryContextState
)

export { ServiceFactoryContext, serviceFactoryContextState }
