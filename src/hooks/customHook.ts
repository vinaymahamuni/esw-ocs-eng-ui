import {
  AgentService,
  AuthContext,
  LocationService,
  ServiceError
} from '@tmtsoftware/esw-ts'
import message from 'antd/lib/message'
import { useContext, useEffect, useState } from 'react'

export const openError = (error: ServiceError | Error) => {
  message.error({
    content: error.message,
    duration: 3
  })
}

export const useAgentService = (): [AgentService | null] => {
  const { auth } = useContext(AuthContext)
  const token = auth?.token()
  if (!auth) {
    throw new Error()
  }
  const [agent, setAgent] = useState<AgentService | null>(null)
  useEffect(() => {
    AgentService(() => token)
      .then((agent) => setAgent(agent))
      .catch((error) => openError(error))
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
    if (!instance) openError(new Error('location service is not up'))
    setLocationService(instance)
  }, [])

  return [locationService]
}
