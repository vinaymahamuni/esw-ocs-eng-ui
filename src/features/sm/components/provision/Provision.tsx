import React from 'react'
import { ProvisionButton } from './ProvisionButton'
import { UnProvisionButton } from './UnProvisionButton'
import { useProvisionStatus } from './useProvisionStatus'
import { withErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../../../../components/ErrorFallback/ErrorFallback'

const Provision = (): JSX.Element => {
  const provisionStatus = useProvisionStatus()
  return provisionStatus.data ? <UnProvisionButton /> : <ProvisionButton />
}

export default withErrorBoundary(Provision, {
  FallbackComponent: ErrorFallback
})
