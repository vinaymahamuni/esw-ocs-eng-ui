import { AgentService, Prefix } from '@tmtsoftware/esw-ts'
import { Button, message, Modal } from 'antd'
import React, { useState } from 'react'
import { SelectAgent } from '../../../agent/components/SelectAgent'
import { useAgentService } from '../../../agent/hooks/useAgentService'
import { obsModeConfig } from '../../constants'
import { useSMAction } from '../../hooks/useSMAction'
import { Spinner } from '../Spinner'

const spawnSM = (agentPrefix: string) => (agent: AgentService) =>
  agent
    .spawnSequenceManager(Prefix.fromString(agentPrefix), obsModeConfig, false)
    .then((res) => {
      if (res._type === 'Failed') throw new Error(res.msg)
      return res
    })

export const SpawnSMButton = (): JSX.Element => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const [agentPrefix, setAgentPrefix] = useState('')

  const agentServiceQuery = useAgentService()

  const mutation = useSMAction(
    spawnSM(agentPrefix),
    'Successfully spawned Sequence Manager',
    'Failed to spawn Sequence Manager'
  )

  const handleModalOk = async () => {
    if (agentPrefix && agentPrefix !== '') {
      agentServiceQuery.data &&
        (await mutation.mutateAsync(agentServiceQuery.data))
      setModalVisibility(false)
    } else {
      message.error(`Please select agent!`)
    }
  }

  const handleModalCancel = () => setModalVisibility(false)
  const handleOnChange = (value: string) => setAgentPrefix(value)

  if (agentServiceQuery.isLoading) return <Spinner />

  return (
    <>
      <Button
        type='primary'
        size='middle'
        loading={mutation.isLoading}
        onClick={() => setModalVisibility(true)}>
        Spawn
      </Button>
      <Modal
        title='Choose an agent to spawn Sequence Manager'
        okText='Spawn'
        centered
        visible={modalVisibility}
        confirmLoading={mutation.isLoading}
        bodyStyle={{ padding: 0 }}
        onOk={handleModalOk}
        onCancel={handleModalCancel}>
        <SelectAgent selectedAgent={agentPrefix} onChange={handleOnChange} />
      </Modal>
    </>
  )
}
