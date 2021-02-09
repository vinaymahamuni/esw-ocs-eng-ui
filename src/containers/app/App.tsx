import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import MenuBar from '../../components/MenuBar/MenuBar'
import { Sider } from '../Sider/Sider'
import styles from './app.module.css'

const { Header, Content } = Layout

const queryClient = new QueryClient()

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header className={styles.tmtHeader}>
          <MenuBar />
        </Header>
        <Layout>
          <Sider />
          <Layout>
            <Content className={[styles.content, styles.home].join(' ')}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
