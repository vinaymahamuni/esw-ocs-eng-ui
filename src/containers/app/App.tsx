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

const App = ({ children }: AppProps): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Layout>
      <Header className={styles.tmtHeader}>
        <MenuBar />
      </Header>
      <Layout className={styles.content}>
        <Sider />
        <Layout className={styles.content}>
          <Content className={[styles.content, styles.home].join(' ')}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
