import { Space } from 'antd'
import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../../components/fallback/ErrorFallback'
import { useSMStatus } from '../queries/useSMStatus'
import { ShutdownSMButton } from './shutdown/ShutdownButton'
import { SpawnSMButton } from './spawn/SpawnButton'

const SMButton = (): JSX.Element => {
  const query = useSMStatus()

  if (query.isLoading) return <div>Loading...</div>
  return (
    <Space align='center'>
      Sequence Manager
      {query.data ? <ShutdownSMButton /> : <SpawnSMButton />}
    </Space>
  )
}

export default withErrorBoundary(SMButton, {
  FallbackComponent: ErrorFallback
})
