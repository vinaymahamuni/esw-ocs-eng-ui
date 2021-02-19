import { Button, Card, PageHeader, Typography, Space } from 'antd'
import React from 'react'
import styles from './infrastructure.module.css'
const { Meta } = Card
const Infrastructure = (): JSX.Element => (
  <>
    <PageHeader
      className={styles.pageHeader}
      onBack={() => window.history.back()}
      title='Manage Infrastructure'
    />
    <Card
      size='default'
      title={
        <Space direction='vertical' size={0}>
          <Typography.Title level={4}>Sequence Manager</Typography.Title>
          <Meta
            description={
              <>
                <Typography.Text type='secondary'>
                  {' Status: '}
                </Typography.Text>
                <Typography.Text type='success'>
                  Running on ESW-agent1
                </Typography.Text>
              </>
            }
          />
        </Space>
      }
      bodyStyle={{ display: 'none' }}
      extra={
        <Space>
          <Button type='primary' size='middle'>
            Provision
          </Button>
          <Button disabled size='middle'>
            Configure
          </Button>
        </Space>
      }>
      Hello
    </Card>
  </>
)

export default Infrastructure
