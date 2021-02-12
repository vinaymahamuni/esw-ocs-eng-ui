import { createContext } from 'react'
import { AgentService, TokenFactory } from '@tmtsoftware/esw-ts'

export interface ServiceFactoryContextType {
  agentServiceFactory: (tokenFactory: TokenFactory) => Promise<AgentService>
}

const serviceFactoryContextState: ServiceFactoryContextType = {
  agentServiceFactory: (tokenFactory) => AgentService(tokenFactory)
}

const ServiceFactoryContext = createContext<ServiceFactoryContextType>(
  serviceFactoryContextState
)

export { ServiceFactoryContext, serviceFactoryContextState }
