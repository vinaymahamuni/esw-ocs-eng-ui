import React, { useContext, useState, useEffect } from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { AuthContext } from '@tmtsoftware/esw-ts'
import { Avatar, Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
import TMTLogo from '../../assets/images/TMT_Logo.png'
import styles from './headerBar.module.css'

const HeaderBar = (): JSX.Element => {
  const { auth, login, logout } = useContext(AuthContext)
  const [username, setUsername] = useState<string | undefined>(undefined)

  useEffect(() => {
    //TODO: cleanup function needed here. to fix the warning `Can't perform a React state update on an unmounted component.`
    auth?.isAuthenticated() &&
      auth?.loadUserProfile().then((n) => {
        setUsername(n.username)
      })
  }, [auth])

  const confirmLogout = () => {
    Modal.confirm({
      title: 'Logging out',
      icon: <LogoutOutlined twoToneColor={'blue'} />,
      okText: 'Logout',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => {
        logout()
      }
    })
  }

  const Logout = () => (
    <>
      <Avatar size={'small'}>{username?.charAt(0).toUpperCase()}</Avatar>
      <Button type='text' onClick={confirmLogout}>
        {username?.toUpperCase()}
      </Button>
    </>
  )

  const Login = () => (
    <Button type='text' onClick={login}>
      Login
    </Button>
  )

  return (
    <>
      {auth?.isAuthenticated() ? <Logout /> : <Login />}
      <Link to={'/'}>
        <img role='tmt_logo' src={TMTLogo} className={styles.logo} />
      </Link>
    </>
  )
}

export default HeaderBar
