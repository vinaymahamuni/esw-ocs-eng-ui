import { Button, Card, PageHeader, Space, Typography } from 'antd'
import React from 'react'
import { useSMStatus } from '../../features/sm/hooks/useSMStatus'
import styles from './infrastructure.module.css'
import Provision from '../../features/sm/components/provision/Provision'

const { Meta } = Card

const SmActions = (): JSX.Element => (
  <Space>
    <Provision />
    <Button disabled size='middle'>
      Configure
    </Button>
  </Space>
)

const SmStatus = (): JSX.Element => {
  const { data } = useSMStatus()
  const smStatus = data?.metadata.agentPrefix
    ? `Running on ${data.metadata.agentPrefix}`
    : 'Service Down'
  return (
    <Space direction='vertical' size={3}>
      <Typography.Text className={styles.pageTitle}>
        Sequence Manager
      </Typography.Text>
      <Meta
        description={
          <>
            <Typography.Text type='secondary'>{' Status: '}</Typography.Text>
            <Typography.Text type='success'> {smStatus}</Typography.Text>
          </>
        }
      />
    </Space>
  )
}

const Infrastructure = (): JSX.Element => {
  return (
    <>
      <PageHeader
        className={styles.pageHeader}
        onBack={() => window.history.back()}
        title='Manage Infrastructure'
      />
      <Card
        size='default'
        title={<SmStatus />}
        bodyStyle={{ display: 'none' }}
        extra={<SmActions />}
      />
    </>
  )
}

export default Infrastructure
