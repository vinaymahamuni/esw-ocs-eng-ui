import { AgentService, AuthContext, LocationService } from '@tmtsoftware/esw-ts'
import { useContext, useEffect, useState } from 'react'

export const useAgent = (): [AgentService | null] => {
  const { auth } = useContext(AuthContext)
  const token = auth?.token()
  if (!auth) {
    throw new Error()
  }
  const [agent, setAgent] = useState<AgentService | null>(null)
  useEffect(() => {
    console.log('setting agent')
    AgentService(() => token)
      .then((agent) => setAgent(agent))
      .catch(console.error)
  }, [token])

  return [agent]
}

export const useLocationService = (): [LocationService | null] => {
  const [
    locationService,
    setLocationService
  ] = useState<LocationService | null>(null)

  useEffect(() => {
    const instance = LocationService()
    if (!instance) throw new Error('location service is not up')
    setLocationService(instance)
  }, [])

  return [locationService]
}
