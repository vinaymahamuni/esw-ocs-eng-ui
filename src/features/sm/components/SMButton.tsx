import { Typography } from 'antd'
import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useSMStatus } from '../hooks/useSMStatus'
import { ShutdownSMButton } from './shutdown/ShutdownButton'
import { SpawnSMButton } from './spawn/SpawnButton'
import { ErrorFallback } from '../../../components/ErrorFallback/ErrorFallback'
import styles from './sm.module.css'

const SMButton = (): JSX.Element => {
  const query = useSMStatus()

  if (query.isLoading) return <div>Loading...</div>
  return (
    <div className={styles.smCard}>
      <Typography.Title level={4}> Sequence Manager </Typography.Title>
      {query.data ? <ShutdownSMButton /> : <SpawnSMButton />}
    </div>
  )
}

export default withErrorBoundary(SMButton, {
  FallbackComponent: ErrorFallback
})
