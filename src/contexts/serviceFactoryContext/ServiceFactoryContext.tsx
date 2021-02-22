import {
  AgentService,
  ConfigService,
  LocationService,
  SequenceManagerService,
  TokenFactory
} from '@tmtsoftware/esw-ts'
import React, { createContext, useContext } from 'react'

export type ServiceFactoryContextType = {
  locationServiceFactory: () => LocationService
  agentServiceFactory: (tokenFactory: TokenFactory) => Promise<AgentService>
  configServiceFactory: (tokenFactory: TokenFactory) => Promise<ConfigService>
  smServiceFactory: (
    tokenFactory: TokenFactory
  ) => Promise<SequenceManagerService>
}

const defaultServiceFactories: ServiceFactoryContextType = {
  locationServiceFactory: () => LocationService(),
  agentServiceFactory: (tokenFactory) => AgentService(tokenFactory),
  configServiceFactory: (tokenFactory: TokenFactory) =>
    ConfigService(tokenFactory),
  smServiceFactory: (tokenFactory: TokenFactory) =>
    SequenceManagerService(tokenFactory)
}

const ServiceFactoryContext = createContext(defaultServiceFactories)

const ServiceFactoryProvider = ({
  children,
  value = defaultServiceFactories
}: {
  children: React.ReactNode
  value?: ServiceFactoryContextType
}): JSX.Element => {
  return (
    <ServiceFactoryContext.Provider value={value}>
      {children}
    </ServiceFactoryContext.Provider>
  )
}

const useServiceFactory = (): ServiceFactoryContextType => {
  const context = useContext(ServiceFactoryContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a ServiceFactoryContext')
  }
  return context
}

export { ServiceFactoryProvider, useServiceFactory }
