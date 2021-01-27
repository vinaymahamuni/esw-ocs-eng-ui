import { LocationService } from '@tmtsoftware/esw-ts'
import { useEffect, useState } from 'react'
import { openError } from './openError'

export const useLocationService = (): [LocationService | null] => {
  const [
    locationService,
    setLocationService
  ] = useState<LocationService | null>(null)

  useEffect(() => {
    const instance = LocationService()
    if (!instance) openError(new Error('location service is not up'))
    setLocationService(instance)
  }, [])

  return [locationService]
}