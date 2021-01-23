import {
  AgentService,
  AuthContext,
  ComponentId,
  HttpConnection,
  LocationService,
  Prefix,
  TrackingEvent
} from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import React, { useState, useContext, useEffect } from 'react'

// todo: temp, get it from user
const agentPrefix = new Prefix('ESW', 'primary')
//todo: should this be provided by user, text area|upload|default?
const obsModeConfig = 'smObsModeConfig.conf'

const smComponentId = new ComponentId(
  new Prefix('ESW', 'sequence_manager'),
  'Service'
)

const SequenceManager = (): JSX.Element => {
  const [isSpawned, setSpawned] = useState(false)
  const [isInProgress, setInProgress] = useState(false)
  const [service, setService] = useState<AgentService | null>(null)
  const [locService, setLocService] = useState<LocationService | null>(
    LocationService()
  )
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { auth } = useContext(AuthContext)
  if (!auth) {
    console.error('failed to get context')
    throw new Error('Auth context is not initialized.')
  }

  const token = auth.token()

  const updateSmState = (trackingEvent: TrackingEvent) => {
    if (trackingEvent._type === 'LocationRemoved') {
      setSpawned(false)
      console.log('sm instance deleted')
    }
    if (trackingEvent._type === 'LocationUpdated') {
      //TODO instantiate new SM Client here, if needed
      console.log('new sm instance created')
      setSpawned(true)
    }
  }

  useEffect(() => {
    const conn = HttpConnection(
      Prefix.fromString('ESW.sequence_manager'),
      'Service'
    )
    locService?.track(conn)(updateSmState)
  }, [])

  useEffect(() => {
    console.log('creating service instance ...')
    setLoading(true)

    AgentService(() => token)
      .then((response) => {
        console.log('created service instance ...')
        setService(response)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
        setError(err)
        setLoading(false)
      })
  }, [token])

  // todo: handle errors
  const handleShutdown = async (agentService: AgentService) => {
    setInProgress(true)
    agentService.killComponent(smComponentId).finally(() => {
      setInProgress(false)
      // setSpawned(false)
    })
  }

  const handleSpawn = async (agentService: AgentService) => {
    setSpawned(false)
    setInProgress(true)
    agentService
      .spawnSequenceManager(agentPrefix, obsModeConfig, false)
      .finally(() => {
        setInProgress(false)
        setSpawned(false)
      })
  }

  if (isLoading) return <div>Loading ...</div>
  if (error) return <div>Error occurred: {error.message}</div>
  if (!service) return <div>Failed to create agent instance</div>

  if (isSpawned) {
    return (
      <Button loading={isInProgress} onClick={() => handleShutdown(service)}>
        Shutdown SM
      </Button>
    )
  }
  return (
    <Button loading={isInProgress} onClick={() => handleSpawn(service)}>
      Spawn SM
    </Button>
  )
}

export default SequenceManager
