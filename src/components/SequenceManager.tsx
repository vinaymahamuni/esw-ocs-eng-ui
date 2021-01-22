import { ComponentId, Prefix } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAgent } from '../hooks/agentHook'
import { sequenceManager, SequenceManagerState } from '../store/store'

const SequenceManager = (): JSX.Element => {
  const { loading, isSpawned } = useSelector(
    (state: SequenceManagerState) => state
  )
  const dispatch = useDispatch()
  const [agent] = useAgent()

  // useEffect(() => {
  //   AgentService(() => token)
  //     .then((agent) => setAgent(agent))
  //     .catch(console.error)
  // }, [])

  const spawnSequenceManager = () => {
    console.log(dispatch)
    dispatch(sequenceManager.actions.startLoading())
    agent
      ?.spawnSequenceManager(
        Prefix.fromString('ESW.primary'),
        'smObsModeConfig.conf',
        false
      )
      .then(() => dispatch(sequenceManager.actions.spawnSuccess()))
      .catch(() => dispatch(sequenceManager.actions.error()))
  }
  const shutDownSequenceManager = () => {
    dispatch(sequenceManager.actions.startLoading())
    agent
      ?.killComponent(
        new ComponentId(Prefix.fromString('ESW.sequence_manager'), 'Service')
      )
      .then(() => dispatch(sequenceManager.actions.shutdownSuccess()))
      .catch(() => dispatch(sequenceManager.actions.error()))
  }

  if (isSpawned) {
    return (
      <Button loading={loading} onClick={shutDownSequenceManager}>
        Shutdown SM
      </Button>
    )
  }
  return (
    <Button loading={loading} onClick={spawnSequenceManager}>
      Spawn SM
    </Button>
  )
}

export default SequenceManager
