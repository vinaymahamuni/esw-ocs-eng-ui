import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { openError } from '../../../hooks/openError'
import { useAgentService } from '../../../hooks/agentHooks'
import { useDispatch } from 'react-redux'
import { SpawnSM } from '../SMActions'
import { Prefix } from '@tmtsoftware/esw-ts'
import { SelectAgent } from '../../agent/components/SelectAgent'
import { SMToggleButton } from './SMButton'

export const SpawnSMButton = (): JSX.Element => {
  const [visibleModal, setModalVisibility] = useState(false)
  const [agentPrefix, setAgentPrefix] = useState('')
  const dispatch = useDispatch()
  const agent = useAgentService()

  const handleModalOk = () => {
    if (agent) {
      dispatch(SpawnSM({ agent, prefix: Prefix.fromString(agentPrefix) }))
      setModalVisibility(false)
    } else openError(new Error('Agent service not up'))
  }
  useEffect(() => {
    console.log('changed', agentPrefix)
  }, [agentPrefix])

  const handleModalCancel = () => {
    setModalVisibility(false)
  }

  const handleOnChange = (value: string) => {
    setAgentPrefix(value)
  }

  const SpawnSMModal = () => {
    return (
      <Modal
        title='Choose an agent to spawn Sequence Manager'
        okText='Spawn'
        visible={visibleModal}
        onOk={handleModalOk}
        // okButtonProps={{disabled}}
        onCancel={handleModalCancel}>
        <SelectAgent agentPrefix={agentPrefix} onChange={handleOnChange} />
      </Modal>
    )
  }
  return (
    <>
      <SMToggleButton
        btnName='Spawn SM'
        disabled={!agent}
        action={() => setModalVisibility(true)}
      />
      <SpawnSMModal />
    </>
  )
}
