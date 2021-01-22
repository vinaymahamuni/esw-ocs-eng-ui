import { AgentService, ServiceError } from '@tmtsoftware/esw-ts'
import React, { useReducer, createContext, useContext } from 'react'

export type ServiceState = {
  Agent: AgentService | null
}
type Action =
  | { type: 'AGENT_SERVICE_SUCCESS'; payload: AgentService }
  | { type: 'AGENT_SERVICE_FAILURE'; payload: ServiceError }

type Dispatch = (action: Action) => void

type ProviderProps = {
  children: React.ReactNode
}

const serviceState: ServiceState = {
  Agent: null
}
const ServiceDispatchContext = createContext<Dispatch | undefined>(undefined)
const ServiceStateContext = createContext(serviceState)

const reducer = (state: ServiceState, action: Action): ServiceState => {
  switch (action.type) {
    case 'AGENT_SERVICE_SUCCESS':
      return { ...state, Agent: action.payload }
    case 'AGENT_SERVICE_FAILURE':
      //show notification using action.payload.message
      return { ...state, Agent: null }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}

const ServiceProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, serviceState)
  console.log('dispatch func', dispatch)
  return (
    <ServiceStateContext.Provider value={state}>
      <ServiceDispatchContext.Provider value={dispatch}>
        {children}
      </ServiceDispatchContext.Provider>
    </ServiceStateContext.Provider>
  )
}

const useServiceState = (): ServiceState => {
  const context = useContext(ServiceStateContext)
  if (context === undefined) {
    throw new Error('useServicesState must be used within a ServiceProvider')
  }
  return context
}

const useServiceDispatch = (): Dispatch => {
  const context = useContext(ServiceDispatchContext)
  if (context === undefined) {
    throw new Error('useServiceDispatch must be used within a ServiceProvider')
  }
  return context
}

const updateAgent = async (dispatch: Dispatch): Promise<void> => {
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyYVZfVWk5N3RGSEFMaW9lTjRncGxEeHp0cjZxZFhHYTFCaHlILVo3TkJBIn0.eyJleHAiOjE2MTEyOTYzOTksImlhdCI6MTYxMTI5NjA5OSwianRpIjoiNDdmYjNmMmYtNGM1MC00YjJkLTlkYjEtMmVmMWZlNmIxOWNiIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMC4xMDA6ODA4MS9hdXRoL3JlYWxtcy9UTVQiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOTY0ZTMwYjEtNjg4ZS00NGUyLThmZTMtNmZhNmU0ZWE4ZjA1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidG10LWZyb250ZW5kLWFwcCIsInNlc3Npb25fc3RhdGUiOiJhMTRjZTU0OS00OWM2LTQ1MzAtOWZhMC01MjkyZmQ2MjhkNGMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiY29uZmlnLWFkbWluIiwiZXN3LXVzZXIiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZXN3LXVzZXIiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.oazKvdNhqRHg-GTcDVr7iSsapDC2Lid9qsoB65MCd1tKrw5BLdsBSxJlbsIXRCEJWSj7vzF3IRbi-CXjEgTS87rMMlaoX8xhLhXRUyiorOGBu8wVGhsbF8_NjCdfcAVKatj0vPuMbXCwuqK97ezPa2Kyuztt0g1h1XlTFS3NCne_fRcnktPyl5u74HGgBSvY3-6NL5Bix--2-flC-_7Pbb0R7apoIv81xXhekzdPGQz9kLg-I4W27Y-JA5G-6r2BzeLd0H2rEe-W4SbnhVE9a7rGUW84mw1CV5NmxZw85VCkZgd1dJxGAotl5pq8KOJM0HUGxmtYUZp4tuteNge5Kg'
  try {
    const instance = await AgentService(() => token)
    dispatch({ type: 'AGENT_SERVICE_SUCCESS', payload: instance })
  } catch (error) {
    dispatch({ type: 'AGENT_SERVICE_FAILURE', payload: error })
  }
}

export { ServiceProvider, useServiceDispatch, useServiceState, updateAgent }
