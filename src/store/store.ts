import { combineReducers, configureStore } from '@reduxjs/toolkit'
import SequenceManager, {
  SequenceManagerState
} from '../features/sm/SequenceManagerStore'
import Agents, { AgentsState } from '../features/agent/AgentStore'

const reducers = combineReducers({
  SequenceManager: SequenceManager.reducer,
  Agents: Agents.reducers
})

const store = configureStore({
  reducer: reducers
})

export type AppRootState = {
  SequenceManager: SequenceManagerState
  Agents: AgentsState
}
export { store }
