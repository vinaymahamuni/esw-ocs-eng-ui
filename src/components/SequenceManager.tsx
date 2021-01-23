import React, { useEffect } from 'react'
import { ComponentId, Prefix } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import {
  updateAgent,
  useServiceDispatch,
  useServiceState
} from '../context/ServiceContext'
import {
  useSMDispatch,
  useSMState,
  spawnSequenceManager
} from '../context/SMContext'

const SequenceManager = (): JSX.Element => {
  const { Agent } = useServiceState()
  const dispatch = useServiceDispatch()
  const { loading, spawned } = useSMState()
  const smDispatch = useSMDispatch()

  useEffect(() => {
    updateAgent(dispatch)
  }, [])

  const shutDownSequenceManager = () => {
    Agent?.killComponent(
      new ComponentId(Prefix.fromString('ESW.sequence_manager'), 'Service')
    )
  }

  return (
    <>
      {Agent && !spawned && (
        <Button
          loading={loading}
          onClick={() => spawnSequenceManager(Agent, smDispatch)}>
          Spawn SM
        </Button>
      )}
      {Agent && spawned && (
        <Button loading={loading} onClick={shutDownSequenceManager}>
          Shutdown SM
        </Button>
      )}
    </>
  )
}

export default SequenceManager
