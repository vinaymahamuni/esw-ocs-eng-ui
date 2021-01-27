import { AuthContext, Login, Logout } from '@tmtsoftware/esw-ts'
import { Space } from 'antd'
import React, { useContext } from 'react'

const NavComponent = (): JSX.Element => {
  const { auth } = useContext(AuthContext)
  return (
    <Space direction='horizontal' align='center'>
      <a href='https://www.tmt.org/' className='brand-logo'>
        TMT
      </a>
      {auth && auth.isAuthenticated() ? <Logout /> : <Login />}
    </Space>
  )
}

export default NavComponent
