import React from 'react'
import { ProvisionButton } from './ProvisionButton'
import { UnProvisionButton } from './UnProvisionButton'
import { useProvisionStatus } from './useProvisionStatus'

export const Provision = (): JSX.Element => {
  const provisionStatus = useProvisionStatus()
  return provisionStatus.data ? <UnProvisionButton /> : <ProvisionButton />
}
