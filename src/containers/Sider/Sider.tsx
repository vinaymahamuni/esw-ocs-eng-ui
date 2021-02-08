import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'

const { SubMenu } = Menu

export const Sider = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    console.log(collapsed)
    setCollapsed(!collapsed)
  }

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className='logo' />
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item key='1' icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <SubMenu key='sub1' icon={<SettingOutlined />} title='Manage'>
          <Menu.Item key='2'>Observations</Menu.Item>
          <Menu.Item key='3'>Infrastructure</Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Sider>
  )
}
