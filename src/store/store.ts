import { combineReducers, configureStore } from '@reduxjs/toolkit'
import SequenceManager, {
  SequenceManagerState
} from '../components/sm/SequenceManagerStore'

const reducers = combineReducers({
  SequenceManager: SequenceManager.reducer
})

const store = configureStore({
  reducer: reducers
})

export type AppRootState = {
  SequenceManager: SequenceManagerState
}
export { store }
