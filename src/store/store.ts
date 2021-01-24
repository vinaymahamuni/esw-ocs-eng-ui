import { configureStore, createSlice } from '@reduxjs/toolkit'

export type SequenceManagerState = {
  isSpawned: boolean
  loading: boolean
}

const reducers = {
  startLoading: (state: SequenceManagerState) => ({ ...state, loading: true }),
  spawned: () => ({ loading: false, isSpawned: true }),
  killed: () => ({ loading: false, isSpawned: false }),
  error: (state: SequenceManagerState) => ({ ...state, loading: false })
}
const sequenceManager = createSlice<SequenceManagerState, typeof reducers>({
  name: 'SequenceManager',
  initialState: {
    isSpawned: false,
    loading: false
  },
  reducers
})

const store = configureStore({
  reducer: sequenceManager.reducer
})

export { store, sequenceManager }
