import { Breadcrumb, Card, Col, Divider, Row } from 'antd'
import React from 'react'
import SMButton from '../../features/sm/components/SMButton'
const { Meta } = Card

const Box = ({ src, title }: { src: string; title: string }) => (
  <Card cover={<img alt={title} src={src} />}>
    <Meta title={title} />
  </Card>
)

const ManageObservation = () => (
  <Box
    src='https://mediad.publicbroadcasting.net/p/khpr/files/styles/x_large/public/201811/image-1.jpeg'
    title='Manage Observation'
  />
)

const ManageInfrastructure = () => (
  <Box
    src='https://mediad.publicbroadcasting.net/p/khpr/files/styles/x_large/public/201811/image-1.jpeg'
    title='Manage Infrastructure'
  />
)

const Home = (): JSX.Element => (
  <>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
    </Breadcrumb>
    <Row gutter={[32, 32]}>
      <Col span={10}>
        <Card>{<SMButton />}</Card>
      </Col>
    </Row>
    <Divider orientation='left' />
    <Row gutter={[32, 32]}>
      <Col className='gutter-row' span={10}>
        <ManageInfrastructure />
      </Col>
      <Col className='gutter-row' span={10}>
        <ManageObservation />
      </Col>
    </Row>
  </>
)

export default Home
