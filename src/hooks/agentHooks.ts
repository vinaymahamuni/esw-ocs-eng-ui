import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { useContext, useEffect, useState } from 'react'
import { openError } from './openError'

export const useAgentService = (): AgentService | null => {
  const { auth } = useContext(AuthContext)
  const token = auth?.token()
  if (!auth) {
    throw new Error()
  }
  const [agent, setAgent] = useState<AgentService | null>(null)
  useEffect(() => {
    AgentService(() => token)
      .then((agent) => setAgent(agent))
      .catch((error) => openError(error))
  }, [token])

  return agent
}
