import { Card, Col, Row } from 'antd'
import React from 'react'
import SMButton from '../../features/sm/components/SMButton'

const Home = (): JSX.Element => (
  <>
    <Row style={{ marginTop: '16px' }}>
      <Col span={18} push={4}>
        <Card style={{ width: 280 }} bodyStyle={{ background: '#ececec' }}>
          {<SMButton />}
        </Card>
      </Col>
    </Row>
  </>
)

export default Home
