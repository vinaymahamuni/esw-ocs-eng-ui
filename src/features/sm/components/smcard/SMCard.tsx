import { Card } from 'antd'
import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useSMStatus } from '../../hooks/useSMStatus'
import { ShutdownSMButton } from '../shutdown/ShutdownButton'
import { SpawnSMButton } from '../spawn/SpawnButton'
import { ErrorFallback } from '../../../../components/ErrorFallback/ErrorFallback'

const SMCard = (): JSX.Element => {
  const smStatus = useSMStatus()

  return (
    <Card
      title='Sequence Manager'
      extra={smStatus.data ? <ShutdownSMButton /> : <SpawnSMButton />}
      bodyStyle={{ display: 'none' }}
    />
  )
}

export default withErrorBoundary(SMCard, {
  FallbackComponent: ErrorFallback
})
