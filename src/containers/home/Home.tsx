import { Card, Col, Row } from 'antd'
import React from 'react'
import SMButton from '../../components/sm/SMButton'

const Home = (): JSX.Element => (
  <>
    <Row>
      <Col span={18} push={6}>
        <Card style={{ width: 300 }}>{<SMButton />}</Card>
      </Col>
    </Row>
  </>
)

export default Home
