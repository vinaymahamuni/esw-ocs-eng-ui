import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import MenuBar from '../../components/menu/MenuBar'
import './app.css'

const { Header, Content } = Layout

const queryClient = new QueryClient()

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Layout>
      <Header className='header'>
        <MenuBar />
      </Header>
      <Layout>
        <Content className='content'>{children} </Content>
      </Layout>
    </Layout>
  </QueryClientProvider>
)

export default App
