import { WarningOutlined } from '@ant-design/icons'
import type { AgentService } from '@tmtsoftware/esw-ts'
import { Button, Modal } from 'antd'
import React from 'react'
import { smComponentId } from './constants'
import { useAgentService } from './queries/queries'
import { useSMAction } from './queries/useSMAction'
import { Spinner } from './Spinner'

const { confirm } = Modal

// eslint-disable-next-line @typescript-eslint/no-empty-function
function showConfirm<T>(onYes: () => T, onNo: () => void = () => {}): void {
  confirm({
    title: 'Do you want to shutdown Sequence Manager?',
    icon: <WarningOutlined />,
    content:
      'Shutting down Sequence Manager may interrupt other ongoing operations.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => onYes(),
    onCancel: () => onNo()
  })
}

export const ShutdownSMButton = (): JSX.Element => {
  const agentQuery = useAgentService()

  const mutation = useSMAction(
    (agent: AgentService) => agent.killComponent(smComponentId),
    'Successfully shutdown Sequence Manager',
    'Failed to shutdown Sequence Manager'
  )

  if (agentQuery.isLoading) return <Spinner />
  if (agentQuery.isError) throw agentQuery.error

  return (
    <Button
      type='primary'
      loading={mutation.isLoading}
      onClick={() =>
        agentQuery.data && showConfirm(() => mutation.mutate(agentQuery.data))
      }>
      Shutdown SM
    </Button>
  )
}
