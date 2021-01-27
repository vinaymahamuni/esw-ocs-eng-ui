import { createSlice } from '@reduxjs/toolkit'
import { openError } from "../../hooks/openError"
import { getAgents } from './getAgents'

export type AgentsState = {
  agents: string[]
  loading: boolean
}

const initialState: AgentsState = {
  agents: [],
  loading: false
}

const AgentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {},
  extraReducers: {
    // TODO: fix this using types
    [getAgents.pending.toString()]: (state: AgentsState) => {
      console.log('in pending', getAgents.pending)
      return {
        ...state,
        loading: true
      }
    },
    [getAgents.fulfilled.toString()]: (
      _: AgentsState,
      { payload }: { payload: string[] }
    ) => {
      return {
        agents: payload,
        loading: false
      }
    },
    [getAgents.rejected.toString()]: (state: AgentsState, error: Error) => {
      openError(error)
      return { ...state, loading: false }
    }
  }
})

export default {
  actions: AgentsSlice.actions,
  reducers: AgentsSlice.reducer
}
