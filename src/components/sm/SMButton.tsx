import React from 'react'
import { ComponentId, Prefix } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import { useAgent } from '../../hooks/customHook'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from '@reduxjs/toolkit'
import { sequenceManager, SequenceManagerState } from '../../store/store'

const SMToggleButton = (btnName: string, action: () => void): JSX.Element => {
  const { loading } = useSelector((state: SequenceManagerState) => state)

  return (
    <Button loading={loading} onClick={() => action()}>
      {btnName}
    </Button>
  )
}

export const ShutdownSMButton = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch()
  const [agent] = useAgent()

  return SMToggleButton('Shutdown SM', () => {
    dispatch(sequenceManager.actions.startLoading())
    agent
      ?.killComponent(
        new ComponentId(Prefix.fromString('ESW.sequence_manager'), 'Service')
      )
      .then(() => dispatch(sequenceManager.actions.killed()))
      .catch(() => dispatch(sequenceManager.actions.error()))
  })
}

export const SpawnSMButton = (): JSX.Element => {
  const dispatch: Dispatch = useDispatch()
  const [agent] = useAgent()

  return SMToggleButton('Spawn SM', () => {
    dispatch(sequenceManager.actions.startLoading())
    agent
      ?.spawnSequenceManager(
        Prefix.fromString('ESW.primary'),
        'smObsModeConfig.conf',
        false
      )
      .then(() => dispatch(sequenceManager.actions.spawned()))
      .catch(() => dispatch(sequenceManager.actions.error()))
  })
}
