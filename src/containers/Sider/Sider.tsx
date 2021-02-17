import Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from './sider.module.css'
import TelescopeIcon from '../../assets/images/icons/Telescope.svg'
import InfraIcon from '../../assets/images/icons/Infrastructure.svg'
import SettingsIcon from '../../assets/images/icons/Settings.svg'
import { Link, useLocation } from 'react-router-dom'

export const Sider = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([])
  const location = useLocation()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const menuItemLabels = [
    {
      title: 'Manage Infrastructure',
      role: 'ManageInfrastructure',
      icon: (
        <Icon
          component={() => (
            <img src={InfraIcon} className={styles.menuIconSize} />
          )}
        />
      ),
      link: '/Infrastructure'
    },
    {
      title: 'Manage Observations',
      role: 'ManageObservations',
      icon: (
        <Icon
          component={() => (
            <img src={TelescopeIcon} className={styles.menuIconSize} />
          )}
        />
      ),
      link: '/Observations'
    },
    {
      title: 'Resources',
      role: 'Resources',
      icon: (
        <Icon
          component={() => (
            <img src={SettingsIcon} className={styles.menuIconSize} />
          )}
        />
      ),
      link: '/Resources'
    }
  ]
  if (location.search.match('/')) setSelectedKeys([])
  return (
    <Layout.Sider
      className={styles.sider}
      theme={'light'}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}>
      <Menu selectedKeys={selectedKeys}>
        {menuItemLabels.map((item, i) => (
          <Menu.Item key={i} icon={item.icon}>
            <Link role={item.role} to={item.link}>
              {item.title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      {/* <div className={styles.siderButton}>
        <LeftOutlined />
      </div> */}
    </Layout.Sider>
  )
}
