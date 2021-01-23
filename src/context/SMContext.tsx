import { AgentService, Prefix } from '@tmtsoftware/esw-ts'
import React, { createContext, useContext, useReducer } from 'react'

type ProviderProps = {
  children: React.ReactNode
}
type SMState = {
  spawned: boolean
  loading: boolean
}
type Action =
  | { type: 'SPAWNING' }
  | { type: 'SPAWN_SM_SUCCESS' }
  | { type: 'SPAWN_SM_FAILED' }

type Dispatch = (action: Action) => void

const SMState: SMState = {
  spawned: false,
  loading: false
}

const SMDispatchContext = createContext<Dispatch | undefined>(undefined)
const SMStateContext = createContext<SMState>(SMState)

const reducer = (state: SMState, action: Action): SMState => {
  switch (action.type) {
    case 'SPAWNING':
      return { loading: true, spawned: false }
    case 'SPAWN_SM_SUCCESS':
      return { loading: false, spawned: true }
    case 'SPAWN_SM_FAILED':
      return { loading: false, spawned: false }
    default:
      return state
  }
}

const SMContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, SMState)
  return (
    <SMStateContext.Provider value={state}>
      <SMDispatchContext.Provider value={dispatch}>
        {children}
      </SMDispatchContext.Provider>
    </SMStateContext.Provider>
  )
}

const useSMState = (): SMState => {
  const context = useContext(SMStateContext)
  if (context === undefined) {
    throw new Error('useSMsState must be used within a SMProvider')
  }
  return context
}

const useSMDispatch = (): Dispatch => {
  const context = useContext(SMDispatchContext)
  if (context === undefined) {
    throw new Error('useSMDispatch must be used within a SMProvider')
  }
  return context
}

const spawnSequenceManager = async (
  Agent: AgentService,
  dispatch: Dispatch
): Promise<void> => {
  try {
    dispatch({ type: 'SPAWNING' })
    await Agent?.spawnSequenceManager(
      Prefix.fromString('ESW.primary'),
      'smObsModeConfig.conf',
      false
    )
    // if(spawned){ }
    dispatch({ type: 'SPAWN_SM_SUCCESS' })
  } catch (error) {
    dispatch({ type: 'SPAWN_SM_FAILED' })
  }
}

export { SMContextProvider, useSMState, useSMDispatch, spawnSequenceManager }
