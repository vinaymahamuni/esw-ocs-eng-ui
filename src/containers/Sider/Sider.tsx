import Icon, { SettingOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from '../app/app.module.css'
import TelescopeIcon from '../../assets/images/icons/Telescope.svg'
import InfraIcon from '../../assets/images/icons/Infrastructure.svg'
import { Link } from 'react-router-dom'
import CheckLogin from '../../routes/CheckLogin'

export const Sider = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const menuItemLabels = [
    {
      title: 'Manage Infrastructure',
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
      icon: <SettingOutlined className={styles.menuIconSize} />,
      link: '/Resources'
    }
  ]

  return (
    <CheckLogin fallbackComponent={<> </>}>
      <Layout.Sider
        style={{ minHeight: '100%' }}
        theme={'light'}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}>
        <Menu className={styles.sider} defaultSelectedKeys={['0']}>
          {menuItemLabels.map((item, i) => (
            <Menu.Item className={styles.menuItem} key={i} icon={item.icon}>
              <Link to={item.link}> {item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
        {/* <div className={styles.siderButton}>
        <LeftOutlined />
      </div> */}
      </Layout.Sider>
    </CheckLogin>
  )
}
