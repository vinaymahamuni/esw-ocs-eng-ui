import { LoadingOutlined } from '@ant-design/icons'
import { AgentService, AuthContext } from '@tmtsoftware/esw-ts'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const Spinner = () => (
  <LoadingOutlined
    style={{ fontSize: '25px', color: '#08c', marginLeft: '100px' }}
  />
)
interface SMToggleButtonProps<T> {
  btnName: string
  onClick: (agent: AgentService) => Promise<T>
}

export default function SMToggleButton<T>({
  btnName,
  onClick
}: SMToggleButtonProps<T>): JSX.Element {
  const queryClient = useQueryClient()
  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to continue ...')

  const agentQuery = useQuery('agent-service', () => AgentService(auth.token), {
    retry: false
  })

  const mutation = useMutation(
    btnName,
    (agent: AgentService) => onClick(agent),
    {
      onSuccess: () => queryClient.refetchQueries('sm-status')
    }
  )

  if (agentQuery.isLoading) return <Spinner />
  if (agentQuery.isError) throw agentQuery.error

  return (
    <Button
      type='primary'
      loading={mutation.isLoading}
      onClick={() => agentQuery.data && mutation.mutate(agentQuery.data)}>
      {btnName}
    </Button>
  )
}
