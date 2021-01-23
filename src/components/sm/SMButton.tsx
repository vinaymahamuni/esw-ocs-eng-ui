import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../fallback/ErrorFallback'
import { useSMStatus } from './queries/queries'
import { ShutdownSMButton } from './ShutdownSMButton'
import { SpawnSMButton } from './SpawnSMButton'

function SMButton(): JSX.Element {
  const query = useSMStatus()

  if (query.isLoading) return <div>Loading...</div>
  if (query.isError) return <div>Failed to fetch SM status {query.error}!</div>
  if (query.data) return <ShutdownSMButton />
  else return <SpawnSMButton />
}

export default withErrorBoundary(SMButton, {
  FallbackComponent: ErrorFallback
})
