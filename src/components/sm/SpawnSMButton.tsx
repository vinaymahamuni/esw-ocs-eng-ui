import type { AgentService } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import React from 'react'
import { agentPrefix, obsModeConfig } from './constants'
import { useAgentService } from './queries/queries'
import { useMutateSM } from './queries/useSMAction'
import { Spinner } from './Spinner'

const spawnSM = (agent: AgentService) =>
  agent.spawnSequenceManager(agentPrefix, obsModeConfig, false).then((res) => {
    if (res._type === 'Failed') throw new Error(res.msg)
    return res
  })

export const SpawnSMButton = (): JSX.Element => {
  const agentQuery = useAgentService()

  const mutation = useMutateSM(
    spawnSM,
    'Successfully spawned Sequence Manager',
    'Failed to spawn Sequence Manager'
  )

  if (agentQuery.isLoading) return <Spinner />

  return (
    <Button
      type='primary'
      loading={mutation.isLoading}
      onClick={() => agentQuery.data && mutation.mutateAsync(agentQuery.data)}>
      Spawn
    </Button>
  )
}
