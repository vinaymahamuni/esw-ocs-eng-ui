import React from 'react'
import { Button } from 'antd'
import { useAgent } from '../../hooks/customHook'
import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from '@reduxjs/toolkit'
import type { SequenceManagerState } from './SequenceManagerStore'
import { KillSM, SpawnSM } from './SMActions'
import type { AppRootState } from '../../store/store'

const SMToggleButton = (
  btnName: string,
  disabled: boolean,
  action: () => void
): JSX.Element => {
  const { loading } = useSelector(
    (state: AppRootState) => state.SequenceManager
  )

  return (
    <Button disabled={disabled} loading={loading} onClick={() => action()}>
      {btnName}
    </Button>
  )
}

export const ShutdownSMButton = (): JSX.Element => {
  const dispatch = useDispatch()
  const [agent] = useAgent()
  const agentServiceDoesNotExists = !agent ? true : false

  return SMToggleButton('Shutdown SM', agentServiceDoesNotExists, () => {
    if (agent) dispatch(KillSM(agent))
    else throw new Error('Agent service not up')
  })
}

export const SpawnSMButton = (): JSX.Element => {
  const dispatch = useDispatch()
  const [agent] = useAgent()
  const agentServiceDoesNotExists = agent ? false : true

  return SMToggleButton('Spawn SM', agentServiceDoesNotExists, () => {
    if (agent) dispatch(SpawnSM(agent))
    else throw new Error('Agent service not up')
  })
}
