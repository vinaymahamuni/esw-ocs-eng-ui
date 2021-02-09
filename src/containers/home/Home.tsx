import { Card, Col, Typography, Row } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import React from 'react'
import SMButton from '../../features/sm/components/SMButton'
import styles from './home.module.css'

const HomePageCard = (text: string, icon: JSX.Element) => (
  <Card title={icon}>
    <Typography.Title level={4}>{text}</Typography.Title>
  </Card>
)

const cards = [
  {
    title: 'Manage Infrastructure',
    icon: <SettingOutlined className={styles.iconSize} />
  },
  {
    title: 'Manage Observations',
    icon: <SettingOutlined className={styles.iconSize} />
  },
  {
    title: 'Resources',
    icon: <SettingOutlined className={styles.iconSize} />
  }
]

const Home = (): JSX.Element => (
  <>
    <Row justify={'center'}>
      <Col span={8}>
        <Card>{<SMButton />}</Card>
      </Col>
    </Row>
    <Row align={'middle'} style={{ minHeight: 'inherit' }}>
      <Col span={24}>
        <Row gutter={[32, 32]}>
          {cards.map((x, index) => (
            <Col key={index} span={8}>
              {HomePageCard(x.title, x.icon)}
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  </>
)

export default Home
