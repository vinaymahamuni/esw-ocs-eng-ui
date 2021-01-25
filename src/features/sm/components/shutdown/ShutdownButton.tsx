import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { AgentService } from '@tmtsoftware/esw-ts'
import { Button, Modal } from 'antd'
import React from 'react'
import { smComponentId } from '../../constants'
import { useMutateSM } from '../../queries/useSMAction'
import { Spinner } from '../Spinner'
import { useAgentService } from '../../../agent/queries/useAgentService'

function showConfirm<T>(
  onYes: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onNo: () => void = () => {}
): void {
  Modal.confirm({
    title: 'Do you want to shutdown Sequence Manager?',
    icon: <ExclamationCircleOutlined />,
    content:
      'Shutting down Sequence Manager may interrupt other ongoing operations.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => onYes(),
    onCancel: () => onNo()
  })
}

const killSM = (agent: AgentService) =>
  agent.killComponent(smComponentId).then((res) => {
    if (res._type === 'Failed') throw new Error(res.msg)
    return res
  })

export const ShutdownSMButton = (): JSX.Element => {
  const agentQuery = useAgentService()

  const mutation = useMutateSM(
    killSM,
    'Successfully shutdown Sequence Manager',
    'Failed to shutdown Sequence Manager'
  )

  if (agentQuery.isLoading) return <Spinner />

  return (
    <Button
      type='primary'
      loading={mutation.isLoading}
      onClick={() =>
        agentQuery.data &&
        showConfirm(() => mutation.mutateAsync(agentQuery.data))
      }>
      Shutdown
    </Button>
  )
}
