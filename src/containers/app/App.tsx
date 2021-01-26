import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MenuBar from '../../components/MenuBar/MenuBar'
import { Sider } from '../Sider/Sider'
import './App.css'

const { Header, Content } = Layout

const queryClient = new QueryClient()

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <MenuBar />
        </Header>
        <Layout>
          <Content style={{ margin: '0 60px' }}>{children} </Content>
        </Layout>
      </Layout>
    </Layout>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
