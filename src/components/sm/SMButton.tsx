import React from 'react'
import { ComponentId, Prefix } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import { openError, useAgent } from '../../hooks/customHook'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from '@reduxjs/toolkit'
import { sequenceManager, SequenceManagerState } from '../../store/store'

const SMToggleButton = (
  btnName: string,
  disabled: boolean,
  action: () => void
): JSX.Element => {
  const { loading } = useSelector((state: SequenceManagerState) => state)

  return (
    <Button disabled={disabled} loading={loading} onClick={() => action()}>
      {btnName}
    </Button>
  )
}

export const ShutdownSMButton = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch()
  const [agent] = useAgent()
  const agentServiceDoesNotExists: boolean = agent ? false : true

  return SMToggleButton('Shutdown SM', agentServiceDoesNotExists, () => {
    dispatch(sequenceManager.actions.startLoading())
    agent
      ?.killComponent(
        new ComponentId(Prefix.fromString('ESW.sequence_manager'), 'Service')
      )
      .then(() => dispatch(sequenceManager.actions.killed()))
      .catch((error) => {
        dispatch(sequenceManager.actions.error())
        openError(error)
      })
  })
}

export const SpawnSMButton = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch()
  const [agent] = useAgent()
  const agentServiceDoesNotExists: boolean = agent ? false : true

  return SMToggleButton('Spawn SM', agentServiceDoesNotExists, () => {
    dispatch(sequenceManager.actions.startLoading())
    agent
      ?.spawnSequenceManager(
        Prefix.fromString('ESW.primary'),
        'smObsModeConfig.conf',
        false
      )
      .then(() => dispatch(sequenceManager.actions.spawned()))
      .catch((error) => {
        dispatch(sequenceManager.actions.error())
        openError(error)
      })
  })
}
