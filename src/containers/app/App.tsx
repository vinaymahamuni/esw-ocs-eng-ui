import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import './app.css'

const { Header, Footer, Sider, Content } = Layout

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps): JSX.Element => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Sider style={{ backgroundColor: '#bbb' }}>Sider</Sider>
      <Content className='content'>{children}</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
)

export default App
