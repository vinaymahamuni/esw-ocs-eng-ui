import Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './sider.module.css'
import TelescopeBlueIcon from '../../assets/images/icons/Telescope_blue.svg'
import TelescopeBlackBgIcon from '../../assets/images/icons/Telescope_black.svg'
import InfraBlueIcon from '../../assets/images/icons/Infrastructure_blue.svg'
import InfraBlackBgIcon from '../../assets/images/icons/Infrastructure_black.svg'
import SettingsBlueIcon from '../../assets/images/icons/Settings_blue.svg'
import SettingsBlackBgIcon from '../../assets/images/icons/Settings_black.svg'
import { Link, useLocation } from 'react-router-dom'
const getMenuLabel = (
  title: string,
  defaultIcon: string,
  selectedIcon: string,
  link: string
) => {
  return {
    title,
    link,
    role: title.replace(' ', ''),
    defaultIcon: (
      <Icon
        component={() => (
          <img src={defaultIcon} className={styles.menuIconSize} />
        )}
      />
    ),
    selectedIcon: (
      <Icon
        component={() => (
          <img src={selectedIcon} className={styles.menuIconSize} />
        )}
      />
    )
  }
}
const menuItemLabels = [
  getMenuLabel(
    'Manage Infrastructure',
    InfraBlackBgIcon,
    InfraBlueIcon,
    '/Infrastructure'
  ),
  getMenuLabel(
    'Manage Observations',
    TelescopeBlackBgIcon,
    TelescopeBlueIcon,
    '/Observations'
  ),
  getMenuLabel('Resources', SettingsBlackBgIcon, SettingsBlueIcon, '/Resources')
]
export const Sider = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  useEffect(() => {
    if (location.pathname === '/') setSelectedKeys([])
  }, [location])

  return (
    <Layout.Sider
      className={styles.sider}
      theme={'light'}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}>
      <Menu selectedKeys={selectedKeys}>
        {menuItemLabels.map((item, i) => (
          <Menu.Item
            onClick={() => setSelectedKeys([i.toString()])}
            key={i}
            icon={
              selectedKeys.includes(i.toString())
                ? item.selectedIcon
                : item.defaultIcon
            }>
            <Link role={item.role} to={item.link}>
              {item.title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  )
}
