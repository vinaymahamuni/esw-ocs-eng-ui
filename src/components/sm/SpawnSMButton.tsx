import type { AgentService } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import React from 'react'
import { agentPrefix, obsModeConfig } from './constants'
import { useAgentService } from './queries/queries'
import { useSMAction } from './queries/useSMAction'
import { Spinner } from './Spinner'

export const SpawnSMButton = (): JSX.Element => {
  const agentQuery = useAgentService()

  const mutation = useSMAction(
    (agent: AgentService) =>
      agent.spawnSequenceManager(agentPrefix, obsModeConfig, false),
    'Successfully spawned Sequence Manager',
    'Failed to spawn Sequence Manager'
  )

  if (agentQuery.isLoading) return <Spinner />
  if (agentQuery.isError) throw agentQuery.error

  return (
    <Button
      type='primary'
      loading={mutation.isLoading}
      onClick={() => agentQuery.data && mutation.mutate(agentQuery.data)}>
      Spawn SM
    </Button>
  )
}
