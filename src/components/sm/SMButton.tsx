import { Space, Typography } from 'antd'
import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../fallback/ErrorFallback'
import { useSMStatus } from './queries/queries'
import { ShutdownSMButton } from './ShutdownSMButton'
import { SpawnSMButton } from './SpawnSMButton'

const SMButton = (): JSX.Element => {
  const query = useSMStatus()

  if (query.isLoading) return <div>Loading...</div>
  return (
    <Space>
      Sequence Manager
      {query.data ? <ShutdownSMButton /> : <SpawnSMButton />}
    </Space>
  )
}

export default withErrorBoundary(SMButton, {
  FallbackComponent: ErrorFallback
})
