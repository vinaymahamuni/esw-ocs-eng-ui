import { AgentService, Prefix } from '@tmtsoftware/esw-ts'
import { Button, Modal, Select, message } from 'antd'
import React, { useState } from 'react'
import { obsModeConfig } from '../constants'
import { useAgentService, useAgents } from '../queries/queries'
import { useMutateSM } from '../queries/useSMAction'
import { Spinner } from '../Spinner'

const spawnSM = (agentPrefix: string) => (agent: AgentService) =>
  agent
    .spawnSequenceManager(Prefix.fromString(agentPrefix), obsModeConfig, false)
    .then((res) => {
      if (res._type === 'Failed') throw new Error(res.msg)
      return res
    })

export const SpawnSMButton = (): JSX.Element => {
  const [visibleModal, setModalVisible] = useState(false)
  const [agentPrefix, setAgentPrefix] = useState('')

  const agentServiceQuery = useAgentService()
  const allAgentQuery = useAgents()

  const mutation = useMutateSM(
    spawnSM(agentPrefix),
    'Successfully spawned Sequence Manager',
    'Failed to spawn Sequence Manager'
  )

  const handleModalOk = async () => {
    if (agentPrefix !== '') {
      agentServiceQuery.data &&
        (await mutation.mutateAsync(agentServiceQuery.data))
      setModalVisible(false)
    } else {
      message.error(`Please select agent prefix!`)
    }
  }

  const handleModalCancel = () => setModalVisible(false)
  const handleOnChange = (value: string) => setAgentPrefix(value)

  if (agentServiceQuery.isLoading) return <Spinner />

  return (
    <>
      <Button
        type='primary'
        loading={mutation.isLoading}
        onClick={() => setModalVisible(true)}>
        Spawn
      </Button>
      <Modal
        title='Choose an agent to spawn Sequence Manager'
        okText='Spawn'
        visible={visibleModal}
        confirmLoading={mutation.isLoading}
        onOk={handleModalOk}
        onCancel={handleModalCancel}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder='Select a agent'
          optionFilterProp='children'
          onChange={handleOnChange}>
          {allAgentQuery.data &&
            allAgentQuery.data.map((agentPrefix) => {
              const agentName = agentPrefix.toJSON()
              return (
                <Select.Option value={agentName} key={agentName}>
                  {agentName}
                </Select.Option>
              )
            })}
        </Select>
      </Modal>
    </>
  )
}
