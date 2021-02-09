import { SettingOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from '../app/app.module.css'

export const Sider = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    console.log(collapsed)
    setCollapsed(!collapsed)
  }
  const menuItems = [
    'Manage Infrastructure',
    'Manage Observations',
    'Resources'
  ]
  return (
    <Layout.Sider
      theme={'light'}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}>
      <Menu className={styles.sider} defaultSelectedKeys={['1']}>
        {menuItems.map((item, i) => (
          <Menu.Item key={i} icon={<SettingOutlined />}>
            {item}
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  )
}
