import { createSlice } from '@reduxjs/toolkit'
import { openError } from '../../hooks/customHook'
import { KillSM, SpawnSM } from './SMActions'

export type SequenceManagerState = {
  isSpawned: boolean
  loading: boolean
}

const reducers = {
  startLoading: (state: SequenceManagerState) => ({ ...state, loading: true }),
  spawned: () => ({ loading: false, isSpawned: true }),
  killed: () => ({ loading: false, isSpawned: false }),
  error: () => ({ isSpawned: false, loading: false })
}

const initialState: SequenceManagerState = {
  isSpawned: false,
  loading: false
}

const sequenceManagerSlice = createSlice({
  name: 'SequenceManager',
  initialState,
  reducers,
  extraReducers: {
    [SpawnSM.fulfilled.name]: () => reducers.spawned(),
    [SpawnSM.pending.name]: (state) => reducers.startLoading(state),
    [SpawnSM.rejected.name]: (_, error) => {
      openError(error)
      reducers.error()
    },
    [KillSM.fulfilled.name]: () => reducers.killed(),
    [KillSM.pending.name]: (state) => reducers.startLoading(state),
    [KillSM.rejected.name]: (_, error) => {
      openError(error)
      reducers.error()
    }
  }
})

export default {
  reducer: sequenceManagerSlice.reducer,
  actions: sequenceManagerSlice.actions
}
