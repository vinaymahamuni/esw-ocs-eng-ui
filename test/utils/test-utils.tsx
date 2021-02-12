import React, { ReactElement } from 'react'
import type {
  KeycloakProfile,
  KeycloakPromise,
  KeycloakResourceAccess,
  KeycloakRoles,
  KeycloakTokenParsed
} from 'keycloak-js'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import {
  ServiceFactoryContext,
  ServiceFactoryContextType
} from '../../src/contexts/serviceFactoryContext/ServiceFactoryContext'
import { instance, mock } from 'ts-mockito'
import { QueryClient, QueryClientProvider } from 'react-query'

const getMockAuth = (loggedIn: boolean) => {
  return {
    hasRealmRole: () => true,
    hasResourceRole: () => false,
    isAuthenticated: () => loggedIn,
    logout: () => Promise.resolve() as KeycloakPromise<void, void>,
    token: () => 'token string',
    tokenParsed: () => ('token string' as unknown) as KeycloakTokenParsed,
    realmAccess: () => ([''] as unknown) as KeycloakRoles,
    resourceAccess: () => ([''] as unknown) as KeycloakResourceAccess,
    loadUserProfile: () =>
      Promise.resolve({
        username: loggedIn ? 'ESW-USER' : ''
      }) as KeycloakPromise<KeycloakProfile, void>
  }
}

type Services = { agentService: AgentService }

type MockServices = {
  serviceFactoryContext: ServiceFactoryContextType
  instance: Services
  mock: Services
}

const getMockServices: () => MockServices = () => {
  const mockAgentService = mock<AgentService>(AgentService)
  const agentServiceInstance = instance<AgentService>(mockAgentService)
  const serviceFactoryContext: ServiceFactoryContextType = {
    agentServiceFactory: () => Promise.resolve(agentServiceInstance)
  }

  return {
    serviceFactoryContext,
    mock: {
      agentService: mockAgentService
    },
    instance: {
      agentService: agentServiceInstance
    }
  }
}

const getContextProvider = (
  loggedIn: boolean,
  mockClients: ServiceFactoryContextType
) => {
  const auth = getMockAuth(loggedIn)

  const contextProvider = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider
      value={{
        auth: auth,
        login: () => ({}),
        logout: () => ({})
      }}>
      <ServiceFactoryContext.Provider value={mockClients}>
        {children}
      </ServiceFactoryContext.Provider>
    </AuthContext.Provider>
  )

  return contextProvider
}

const getContextAndQueryClientProvider = (
  loggedIn: boolean,
  mockClients: ServiceFactoryContextType = getMockServices()
    .serviceFactoryContext
) => {
  const queryClient = new QueryClient()
  const ContextProvider = getContextProvider(loggedIn, mockClients)

  const provider = ({ children }: { children: React.ReactNode }) => (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ContextProvider>
  )
  return provider
}

const renderWithAuth = (
  ui: ReactElement,
  loggedIn = true,
  mockClients: ServiceFactoryContextType = getMockServices()
    .serviceFactoryContext,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return render(ui, {
    wrapper: getContextProvider(
      loggedIn,
      mockClients
    ) as React.FunctionComponent<Record<string, unknown>>,
    ...options
  })
}
// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { renderWithAuth, getMockServices, getContextAndQueryClientProvider }
export type { MockServices }
