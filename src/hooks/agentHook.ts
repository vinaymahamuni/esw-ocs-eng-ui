import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { useContext, useEffect, useState } from 'react'

export const useAgent = (): [AgentService | null] => {
  const { auth } = useContext(AuthContext)
  const token = auth?.token()
  if (!auth) {
    throw new Error()
  }
  const [agent, setAgent] = useState<AgentService | null>(null)

  useEffect(() => {
    AgentService(auth.token)
      .then((agent) => setAgent(agent))
      .catch(console.error)
  }, [auth.token, token])

  return [agent]
}
