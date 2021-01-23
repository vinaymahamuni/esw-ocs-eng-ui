import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'

function SMToggleButton<T>(
  btnName: string,
  onClick: (agent: AgentService) => Promise<T>
): JSX.Element {
  const queryClient = useQueryClient()
  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to continue ...')

  const agentService = AgentService(auth.token)

  const mutation = useMutation(
    btnName,
    async () => {
      const agent = await agentService
      await onClick(agent)
    },
    {
      onSuccess: () => queryClient.refetchQueries('sm-status')
    }
  )

  return (
    <Button loading={mutation.isLoading} onClick={() => mutation.mutate()}>
      {btnName}
    </Button>
  )
}

export default SMToggleButton
