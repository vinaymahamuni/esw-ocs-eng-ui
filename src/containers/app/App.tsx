import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import NavComponent from '../../components/NavComponent'
import './app.css'

const { Header, Footer, Sider, Content } = Layout

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps): JSX.Element => (
  <Layout>
    <Header className='header'>
      <NavComponent />
    </Header>
    <Layout>
      <Sider style={{ backgroundColor: '#bbb' }}>Sider</Sider>
      <Content className='content'>{children}</Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
)

export default App
