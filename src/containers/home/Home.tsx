import { Card, Col, Row, Typography } from 'antd'
import Icon from '@ant-design/icons'
import React from 'react'
import SMCard from '../../features/sm/components/smcard/SMCard'
import styles from './home.module.css'
import { Link } from 'react-router-dom'
import TelescopeIcon from '../../assets/images/icons/Telescope.svg'
import InfraIcon from '../../assets/images/icons/Infrastructure.svg'
import SettingsIcon from '../../assets/images/icons/Settings.svg'

type CardDetail = {
  title: string
  icon: JSX.Element
  link: string
}

const getCardDetails = (title: string, icon: string, link: string) => {
  return {
    title,
    link,
    icon: (
      <Icon
        component={() => <img src={icon} className={styles.commonIconSize} />}
      />
    )
  }
}
const cards: CardDetail[] = [
  getCardDetails('Manage Infrastructure', InfraIcon, '/Infrastructure'),
  getCardDetails('Manage Observations', TelescopeIcon, '/Observations'),
  getCardDetails('Resources', SettingsIcon, '/Resources')
]

const HomePageCard = (card: CardDetail) => (
  <Link role={card.title} to={card.link}>
    <Card hoverable className={styles.homePageCards}>
      <Icon component={() => card.icon} />
      <Typography.Title className={styles.cardTitle} level={3}>
        {card.title}
      </Typography.Title>
    </Card>
  </Link>
)

const Home = (): JSX.Element => (
  <>
    <Row justify={'center'}>
      <Col>{<SMCard />}</Col>
    </Row>
    <Row align={'middle'} className={styles.inheritMinHeight}>
      <Col span={24}>
        <Row gutter={[32, 32]} className={styles.homePageCardsRow}>
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
