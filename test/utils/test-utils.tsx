import React, { ReactElement } from 'react'
import {
  KeycloakPromise,
  KeycloakProfile,
  KeycloakTokenParsed,
  KeycloakRoles,
  KeycloakResourceAccess
} from 'keycloak-js'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { AuthContext } from '@tmtsoftware/esw-ts'

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

const getContextProvider = (loggedIn: boolean) => {
  const auth = getMockAuth(loggedIn)
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider
      value={{
        auth: auth,
        login: () => ({}),
        logout: () => ({})
      }}>
      {children}
    </AuthContext.Provider>
  )

  return AllTheProviders
}

const renderWithAuth = (
  ui: ReactElement,
  loggedIn = true,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return render(ui, {
    wrapper: getContextProvider(loggedIn) as React.FunctionComponent<
      Record<string, unknown>
    >,
    ...options
  })
}
// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { renderWithAuth }
