import { Card, Col, Row, Typography } from 'antd'
import Icon, { SettingOutlined } from '@ant-design/icons'
import React from 'react'
import SMCard from '../../features/sm/components/SMCard'
import styles from './home.module.css'
import { Link } from 'react-router-dom'
import TelescopeIcon from '../../assets/images/icons/Telescope.png'
import InfraIcon from '../../assets/images/icons/Infrastructure.png'

type CardDetail = {
  title: string
  icon: JSX.Element
  link: string
}
const HomePageCard = (card: CardDetail) => (
  <Link to={card.link}>
    <Card hoverable className={styles.homePageCards}>
      <Icon component={() => card.icon} />
      <Typography.Title level={3}>{card.title}</Typography.Title>
    </Card>
  </Link>
)

const cards: CardDetail[] = [
  {
    title: 'Manage Infrastructure',
    icon: (
      <Icon
        component={() => (
          <img src={InfraIcon} className={styles.commonIconSize} />
        )}
      />
    ),
    link: '/Infrastructure'
  },
  {
    title: 'Manage Observations',
    icon: (
      <Icon
        component={() => (
          <img src={TelescopeIcon} className={styles.commonIconSize} />
        )}
      />
    ),
    link: '/Observations'
  },
  {
    title: 'Resources',
    icon: <SettingOutlined className={styles.settingsIcon} />,
    link: '/Resources'
  }
]

const Home = (): JSX.Element => (
  <>
    <Row justify={'center'}>
      <Col span={8}>{<SMCard />}</Col>
    </Row>
    <Row align={'middle'} className={styles.inheritMinHeight}>
      <Col span={24}>
        <Row gutter={[32, 32]}>
          {cards.map((x, index) => (
            <Col key={index} span={8}>
              {HomePageCard(x)}
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  </>
)

export default Home
