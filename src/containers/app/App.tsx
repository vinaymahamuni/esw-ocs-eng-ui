import { Layout } from 'antd'
import 'antd/dist/antd.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { Sider } from '../Sider/Sider'
import Container from './Container'
import styles from './app.module.css'
import CheckLogin from '../../routes/CheckLogin'

const { Header } = Layout

const queryClient = new QueryClient()

interface AppProps {
  children: React.ReactNode
}

const App = ({ children }: AppProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header className={styles.tmtHeader}>
          <HeaderBar />
        </Header>
        <Container>{children}</Container>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
