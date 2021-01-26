import { Space, Typography } from 'antd'
import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useSMStatus } from '../queries/useSMStatus'
import { ShutdownSMButton } from './shutdown/ShutdownButton'
import { SpawnSMButton } from './spawn/SpawnButton'
import { ErrorFallback } from '../../../components/ErrorFallback/ErrorFallback'

const SMButton = (): JSX.Element => {
  const query = useSMStatus()

  if (query.isLoading) return <div>Loading...</div>
  return (
    <Space align='center'>
      <Typography.Title level={5}> Sequence Manager </Typography.Title>
      {query.data ? <ShutdownSMButton /> : <SpawnSMButton />}
    </Space>
  )
}

export default withErrorBoundary(SMButton, {
  FallbackComponent: ErrorFallback
})
