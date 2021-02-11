import { AlarmServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/alarm/AlarmServiceImpl'
import { EventServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/event/EventServiceImpl'
import { CommandServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/command/CommandServiceImpl'
import {
  anyFunction,
  anyNumber,
  anyString,
  anything,
  deepEqual,
  mock,
  when
} from 'ts-mockito'
import { AgentServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/agent-service/AgentServiceImpl'
import { SequenceManagerImpl } from '@tmtsoftware/esw-ts/dist/src/clients/sequence-manager/SequenceManagerImpl'
import {
  AkkaLocation,
  Auth,
  Connection,
  HttpLocation,
  KillResponse,
  Location,
  Prefix,
  SpawnResponse
} from '@tmtsoftware/esw-ts'
import { eswAgentConnection } from '@tmtsoftware/esw-ts/dist/src/config/Connections'
import {
  obsModeConfig,
  smComponentId,
  smConnection
} from '../features/sm/constants'
import { MockedLocationService } from './MockedLocationService'
import type { AuthContextType } from '@tmtsoftware/esw-ts/dist/src/components/aas/context/AuthContext'
import type KC from 'keycloak-js'
import type { LocationServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/location/LocationServiceImpl'

declare global {
  interface Window {
    isMocked?: boolean

    instance<T>(mockedValue: T): T

    mockedAlarmService: AlarmServiceImpl
    mockedEventService: EventServiceImpl
    mockedCommandService: CommandServiceImpl
    mockedAgentService: AgentServiceImpl
    mockedLocationService: LocationServiceImpl
    mockedSequenceManager: SequenceManagerImpl
    auth: AuthContextType
  }
}

export const mockAuth = (
  isAuthenticated = true,
  hasResourceRole = true,
  testRealmRoles = 'test-realm-roles'
) => {
  const tokenParsed = {
    exp: 10
  }
  const keycloakRoles = { roles: [testRealmRoles] }
  const keycloakResourceAccess = { mockResource: keycloakRoles }
  const auth: Auth = {
    hasRealmRole: (role) => keycloakRoles.roles.includes(role),
    hasResourceRole: () => hasResourceRole,
    isAuthenticated: () => isAuthenticated,
    logout: anyFunction,
    token: () => 'token string',
    tokenParsed: () => tokenParsed,
    realmAccess: () => keycloakRoles,
    resourceAccess: () => keycloakResourceAccess,
    loadUserProfile: () =>
      Promise.resolve({
        username: isAuthenticated ? 'admin' : undefined
      }) as KC.KeycloakPromise<KC.KeycloakProfile, void>
  }
  return auth
}

export const startMocks = (): void => {
  console.log('loading mocks')
  window.mockedAlarmService = mock(AlarmServiceImpl)
  window.mockedEventService = mock(EventServiceImpl)
  window.mockedCommandService = mock(CommandServiceImpl)
  window.mockedAgentService = mock(AgentServiceImpl)
  window.mockedSequenceManager = mock(SequenceManagerImpl)
  window.auth = {
    auth: mockAuth(),
    login: () => {
      window.auth.auth = mockAuth()
    },
    logout: () => {
      window.auth.auth = null
    }
  }

  const eswAgentPrefix = new Prefix('ESW', 'esw_machine')

  const eswAgentLocation: AkkaLocation = {
    _type: 'AkkaLocation',
    connection: eswAgentConnection,
    uri: '',
    metadata: {}
  }

  const smLocation: HttpLocation = {
    _type: 'HttpLocation',
    connection: smConnection,
    uri: 'http://localhost:9090/',
    metadata: {}
  }

  const mockedLocationService = new MockedLocationService([eswAgentLocation])
  //***********************************location service mocks***********************************\\

  when(window.mockedLocationService.list()).thenCall(() =>
    mockedLocationService.list()
  )

  when(
    window.mockedLocationService.listByComponentType(anything())
  ).thenCall((con) => mockedLocationService.listByComponentType(con))

  when(
    window.mockedLocationService.listByConnectionType(anything())
  ).thenCall((con) => mockedLocationService.listByConnectionType(con))

  when(
    window.mockedLocationService.listByHostname(anything())
  ).thenCall((hostname) => mockedLocationService.listByHostname(hostname))

  when(
    window.mockedLocationService.listByPrefix(anything())
  ).thenCall((prefix) => mockedLocationService.listByPrefix(prefix))

  when(window.mockedLocationService.find(anything())).thenCall((conn) =>
    mockedLocationService.find(conn)
  )

  when(window.mockedLocationService.unregister(anything())).thenCall((conn) =>
    mockedLocationService.unregister(conn)
  )

  when(window.mockedLocationService.track(anything())).thenCall((conn) =>
    mockedLocationService.track(conn)
  )

  when(
    window.mockedLocationService.resolve(anything(), anyNumber(), anyString())
  ).thenCall((con) => mockedLocationService.resolve(con))

  //********************************************************************************************\\

  const Spawned: SpawnResponse = {
    _type: 'Spawned'
  }

  const Killed: KillResponse = {
    _type: 'Killed'
  }

  const startComp = (location: Location, response: SpawnResponse) => {
    return mockedLocationService.register(location).then(() => response)
  }

  const shutdownComp = (connection: Connection, response: KillResponse) => {
    return mockedLocationService.unregister(connection).then(() => response)
  }

  when(
    window.mockedAgentService.spawnSequenceManager(
      deepEqual(eswAgentPrefix),
      obsModeConfig,
      false
    )
  ).thenCall(() => startComp(smLocation, Spawned))

  when(window.mockedAgentService.killComponent(smComponentId)).thenCall(() =>
    shutdownComp(smConnection, Killed)
  )
}
