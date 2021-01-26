import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { AuthContext } from '@tmtsoftware/esw-ts'
import { Button, Menu } from 'antd'
import React, { useContext, useState, useEffect } from 'react'

const MenuBar = (): JSX.Element => {
  const { auth, login, logout } = useContext(AuthContext)
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    auth?.loadUserProfile().then((n) => setUsername(n.username))
  }, [auth])

  const Logout = () => (
    <Button type='primary' onClick={logout} icon={<LogoutOutlined />}>
      Logout
    </Button>
  )

  const Login = () => (
    <Button type='primary' onClick={login} icon={<LoginOutlined />}>
      Login
    </Button>
  )

  return (
    <Menu mode='horizontal' theme='dark' style={{ float: 'right' }}>
      <Menu.Item>{username ?? null}</Menu.Item>
      <Menu.Item>{auth?.isAuthenticated() ? <Logout /> : <Login />}</Menu.Item>
    </Menu>
  )
}

export default MenuBar
