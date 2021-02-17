import React, { ReactElement } from 'react'
import type {
  KeycloakProfile,
  KeycloakPromise,
  KeycloakResourceAccess,
  KeycloakRoles,
  KeycloakTokenParsed
} from 'keycloak-js'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import {
  AgentService,
  AuthContext,
  Location,
  LocationService
} from '@tmtsoftware/esw-ts'
import {
  ServiceFactoryContext,
  ServiceFactoryContextType
} from '../../src/contexts/serviceFactoryContext/ServiceFactoryContext'
import { instance, mock, when } from 'ts-mockito'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AgentServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/agent-service/AgentServiceImpl'
import { LocationServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/location/LocationServiceImpl'

const getMockAuth = (loggedIn: boolean) => {
  let loggedInValue = loggedIn
  return {
    hasRealmRole: () => true,
    hasResourceRole: () => false,
    isAuthenticated: () => loggedInValue,
    logout: () => {
      console.log('asdaonsdakd')
      loggedInValue = false
      return Promise.resolve() as KeycloakPromise<void, void>
    },
    token: () => 'token string',
    tokenParsed: () => ('token string' as unknown) as KeycloakTokenParsed,
    realmAccess: () => ([''] as unknown) as KeycloakRoles,
    resourceAccess: () => ([''] as unknown) as KeycloakResourceAccess,
    loadUserProfile: () =>
      Promise.resolve({
        username: loggedInValue ? 'ESW-USER' : ''
      }) as KeycloakPromise<KeycloakProfile, void>
  }
}

type Services = {
  agentService: AgentService
  locationService: LocationService
}

type MockServices = {
  serviceFactoryContext: ServiceFactoryContextType
  instance: Services
  mock: Services
}

const getMockServices: () => MockServices = () => {
  const agentServiceMock = mock(AgentServiceImpl)
  const agentServiceInstance = instance<AgentService>(agentServiceMock)
  const locationServiceMock = mock(LocationServiceImpl)
  const locationServiceInstance = instance<LocationService>(locationServiceMock)
  // console.log('creation', locationServiceInstance)
  const serviceFactoryContext: ServiceFactoryContextType = {
    agentServiceFactory: () => Promise.resolve(agentServiceInstance),
    locationServiceFactory: () => locationServiceInstance
  }

  return {
    serviceFactoryContext,
    mock: {
      agentService: agentServiceMock,
      locationService: locationServiceMock
    },
    instance: {
      agentService: agentServiceInstance,
      locationService: locationServiceInstance
    }
  }
}

const getContextProvider = (
  loggedIn: boolean,
  mockClients: ServiceFactoryContextType,
  loginFunc: () => void,
  logoutFunc: () => void
) => {
  const auth = getMockAuth(loggedIn)

  const contextProvider = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider
      value={{
        auth: auth,
        login: loginFunc,
        logout: logoutFunc
      }}>
      <ServiceFactoryContext.Provider value={mockClients}>
        {children}
      </ServiceFactoryContext.Provider>
    </AuthContext.Provider>
  )

  return contextProvider
}

const getContextWithQueryClientProvider = (
  loggedIn: boolean,
  mockClients: ServiceFactoryContextType,
  loginFunc: () => void,
  logoutFunc: () => void
) => {
  const queryClient = new QueryClient()
  const ContextProvider = getContextProvider(
    loggedIn,
    mockClients,
    loginFunc,
    logoutFunc
  )

  const provider = ({ children }: { children: React.ReactNode }) => (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ContextProvider>
  )
  return provider
}
interface MockProps {
  ui: ReactElement
  loggedIn?: boolean
  mockClients?: ServiceFactoryContextType
  loginFunc?: () => void
  logoutFunc?: () => void
}

const renderWithAuth = (
  {
    ui,
    loggedIn = true,
    mockClients = getMockServices().serviceFactoryContext,
    loginFunc = () => ({}),
    logoutFunc = () => ({})
  }: MockProps,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return render(ui, {
    wrapper: getContextWithQueryClientProvider(
      loggedIn,
      mockClients,
      loginFunc,
      logoutFunc
    ) as React.FunctionComponent<Record<string, unknown>>,
    ...options
  })
}
// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { renderWithAuth, getMockServices, getContextWithQueryClientProvider }
export type { MockServices }
