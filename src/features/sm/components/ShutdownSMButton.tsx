import React from 'react'
import { useDispatch } from 'react-redux'
import { useAgentService } from '../../../hooks/agentHooks'
import { openError } from '../../../hooks/openError'
import { KillSM } from '../SMActions'
import { SMToggleButton } from './SMButton'

export const ShutdownSMButton = (): JSX.Element => {
  const dispatch = useDispatch()
  const agent = useAgentService()

  return (
    <SMToggleButton
      btnName='Shutdown SM'
      disabled={!agent}
      action={() => {
        if (agent) dispatch(KillSM(agent))
        else openError(new Error('Agent service not up'))
      }}
    />
  )
}
