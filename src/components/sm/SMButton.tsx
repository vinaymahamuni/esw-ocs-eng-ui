import { LocationService } from '@tmtsoftware/esw-ts'
import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useQuery } from 'react-query'
import { ErrorFallback } from '../fallback/ErrorFallback'
import {
  agentPrefix,
  obsModeConfig,
  smComponentId,
  smConnection
} from './constants'
import SMToggleButton from './SMToggleButton'

const locationService = LocationService()

const ShutdownSMButton = () => (
  <SMToggleButton
    btnName='Shutdown SM'
    onClick={(agent) => agent.killComponent(smComponentId)}
  />
)

const SpawnSMButton = () => (
  <SMToggleButton
    btnName='Spawn SM'
    onClick={(agent) =>
      agent.spawnSequenceManager(agentPrefix, obsModeConfig, false)
    }
  />
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

export default withErrorBoundary(SMButton, {
  FallbackComponent: ErrorFallback
})
