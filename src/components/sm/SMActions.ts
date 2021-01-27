import { createAsyncThunk } from '@reduxjs/toolkit'
import { AgentService, ComponentId, Prefix } from '@tmtsoftware/esw-ts'
import { openError } from '../../hooks/customHook'
import SequenceManager from './SequenceManagerStore'

export const KillSM = createAsyncThunk(
  'KillSM',
  async (agent: AgentService, { dispatch }) => {
    const { actions } = SequenceManager
    dispatch(actions.startLoading())
    try {
      const spawned = await agent.killComponent(
        new ComponentId(Prefix.fromString('ESW.sequence_manager'), 'Service')
      )
      if (spawned._type == 'Killed') dispatch(actions.killed())
      else dispatch(actions.error())
    } catch (e) {
      dispatch(actions.error())
      openError(e)
    }
  }
)

export const SpawnSM = createAsyncThunk(
  'SpawnSM',
  async (agent: AgentService, { dispatch }) => {
    const { actions } = SequenceManager
    dispatch(actions.startLoading())
    try {
      const spawned = await agent.spawnSequenceManager(
        Prefix.fromString('ESW.primary'),
        'smObsModeConfig.conf',
        false
      )
      if (spawned._type === 'Spawned') {
        dispatch(actions.spawned())
      } else dispatch(actions.error())
    } catch (e) {
      dispatch(actions.error())
      openError(e)
    }
  }
)
