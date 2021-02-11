import type {
  ComponentType,
  Connection,
  ConnectionType,
  Done,
  Location,
  LocationRemoved,
  LocationUpdated,
  Option,
  Prefix,
  Subscription,
  TrackingEvent
} from '@tmtsoftware/esw-ts'
import { extractHostPort } from '@tmtsoftware/esw-ts/dist/src/utils/Utils'

type CallBack = (trackingEvent: TrackingEvent) => void

export class MockedLocationService {
  private locations: Location[]
  private readonly trackingConnection: Map<Connection, CallBack> = new Map()

  constructor(locations: Location[]) {
    this.locations = locations
  }

  list(): Promise<Location[]> {
    return Promise.resolve(this.locations)
  }

  listByComponentType(componentType: ComponentType): Promise<Location[]> {
    return Promise.resolve(
      this.locations.filter((loc) => {
        return loc.connection.componentType == componentType
      })
    )
  }

  listByHostname(hostname: string): Promise<Location[]> {
    return Promise.resolve(
      this.locations.filter((loc) => {
        return extractHostPort(loc.uri).host == hostname
      })
    )
  }

  listByConnectionType(connectionType: ConnectionType): Promise<Location[]> {
    return Promise.resolve(
      this.locations.filter((loc) => {
        return loc.connection.connectionType == connectionType
      })
    )
  }

  listByPrefix(prefix: Prefix): Promise<Location[]> {
    return Promise.resolve(
      this.locations.filter((loc) => {
        return loc.connection.prefix.toJSON() == prefix.toJSON()
      })
    )
  }

  find(connection: Connection): Promise<Option<Location>> {
    return Promise.resolve(this.findConnection(connection))
  }

  resolve(connection: Connection): Promise<Option<Location>> {
    return this.find(connection)
  }

  track(connection: Connection): (callBack: CallBack) => Subscription {
    return (callBack: CallBack) => {
      if (!this.isInTracking(connection))
        this.trackingConnection.set(connection, callBack)
      return {
        cancel: () => {
          this.trackingConnection.delete(connection)
        }
      }
    }
  }

  unregister(connection: Connection): Promise<Done> {
    const compLoc = this.findConnection(connection)
    this.locations = compLoc
      ? this.locations.filter((loc) => loc != compLoc)
      : this.locations

    const event: LocationRemoved = {
      _type: 'LocationRemoved',
      connection: connection
    }
    this.callWithTrackEvent(connection, event)
    return Promise.resolve('Done')
  }

  register(location: Location): Promise<void> {
    const isRegistered = this.locations.some((loc) =>
      MockedLocationService.isSameConnection(
        location.connection,
        loc.connection
      )
    )
    if (isRegistered) return Promise.reject('Component is registered')
    this.locations = isRegistered
      ? this.locations
      : this.locations.concat(location)

    const event: LocationUpdated = {
      _type: 'LocationUpdated',
      location
    }
    return Promise.resolve(this.callWithTrackEvent(location.connection, event))
  }

  private isInTracking(connection: Connection): boolean {
    return [...this.trackingConnection.keys()].some((c) =>
      MockedLocationService.isSameConnection(c, connection)
    )
  }

  private findConnection(connection: Connection): Option<Location> {
    return this.locations.find((loc) => {
      return MockedLocationService.isSameConnection(loc.connection, connection)
    })
  }

  private callWithTrackEvent(
    connection: Connection,
    event: TrackingEvent
  ): void {
    const callBack = this.trackingConnection.get(connection)
    if (callBack) {
      callBack(event)
    }
  }

  private static isSameConnection(
    connection1: Connection,
    connection2: Connection
  ): boolean {
    return (
      connection1.prefix == connection2.prefix &&
      connection1.connectionType == connection2.connectionType &&
      connection1.componentType == connection2.componentType
    )
  }
}
