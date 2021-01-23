import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { AuthContext } from '@tmtsoftware/esw-ts'
import { Button, Menu } from 'antd'
import React, { useContext } from 'react'

const MenuBar = (): JSX.Element => {
  const { auth, login, logout } = useContext(AuthContext)

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

  const Logo = () => <a href='https://tmt.org'>TMT</a>

  return (
    <Menu mode='horizontal'>
      <Menu.Item key='logo'>{<Logo />}</Menu.Item>
      <Menu.Item>{auth?.isAuthenticated() ? <Logout /> : <Login />}</Menu.Item>
    </Menu>
  )
}

export default MenuBar
