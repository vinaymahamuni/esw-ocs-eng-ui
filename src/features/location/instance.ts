import { LocationService } from '@tmtsoftware/esw-ts'
import { instance, mock } from 'ts-mockito'
import { LocationServiceImpl } from '@tmtsoftware/esw-ts/dist/src/clients/location/LocationServiceImpl'

window.isMocked = true
window.instance = instance
window.mockedLocationService = mock(LocationServiceImpl)

export const locationService = LocationService()
