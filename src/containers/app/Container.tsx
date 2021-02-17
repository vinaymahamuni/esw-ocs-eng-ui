import React from 'react'
import { Sider } from '../Sider/Sider'
import styles from './app.module.css'

import { Layout } from 'antd'
import CheckLogin from '../../routes/CheckLogin'
const { Content } = Layout
interface AppProps {
  children: React.ReactNode
}

const Container = ({ children }: AppProps): JSX.Element => {
  return (
    <CheckLogin fallbackComponent={<></>}>
      <Layout>
        <Sider />
        <Layout>
          <Content className={[styles.content, styles.home].join(' ')}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </CheckLogin>
  )
}

export default Container
