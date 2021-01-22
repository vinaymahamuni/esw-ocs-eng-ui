import { configureStore, createSlice } from '@reduxjs/toolkit'

export type SequenceManagerState = {
  isSpawned: boolean
  loading: boolean
}

const reducers = {
  startLoading: (state: SequenceManagerState) => ({ ...state, loading: true }),
  spawnSuccess: () => ({ loading: false, isSpawned: true }),
  shutdownSuccess: () => ({ loading: false, isSpawned: false }),
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
