import { LocationService } from '@tmtsoftware/esw-ts'
import React from 'react'
import { useQuery } from 'react-query'
import {
  smConnection,
  smComponentId,
  agentPrefix,
  obsModeConfig
} from './constants'
import SMToggleButton from './SMToggleButton'

const locationService = LocationService()

const ShutdownSMButton = () =>
  SMToggleButton('Shutdown SM', (agent) => agent.killComponent(smComponentId))

const SpawnSMButton = () =>
  SMToggleButton('Spawn SM', (agent) =>
    agent.spawnSequenceManager(agentPrefix, obsModeConfig, false)
  )

function SMButton(): JSX.Element {
  const { status, data, error } = useQuery('sm-status', () =>
    locationService.find(smConnection)
  )
  console.log(status)

  if (status === 'loading') return <div>Loading...</div>
  else if (status === 'error') return <div>Error {error}!</div>
  else if (data) return <ShutdownSMButton />
  else return <SpawnSMButton />
}

export default SMButton
