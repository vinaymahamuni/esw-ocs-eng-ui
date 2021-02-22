import type {
  AkkaLocation,
  HttpLocation,
  Option,
  TcpConnection
} from '@tmtsoftware/esw-ts'
import { Button, Card, PageHeader, Space, Typography } from 'antd'
import React from 'react'
import Provision from '../../features/sm/components/provision/Provision'
import { useSMStatus } from '../../features/sm/hooks/useSMStatus'
import styles from './infrastructure.module.css'

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
  const smStatus = data?.metadata.agentPrefix ? (
    <Typography.Text type='success'>
      Running on {data.metadata.agentPrefix}
    </Typography.Text>
  ) : (
    <Typography.Text type='danger'>Service Down</Typography.Text>
  )
  return (
    <Space direction='vertical' size={3}>
      <Typography.Text className={styles.pageTitle}>
        Sequence Manager
      </Typography.Text>
      <Meta
        description={
          <>
            <Typography.Text type='secondary'>{' Status: '}</Typography.Text>
            {smStatus}
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
