import { AuthContext } from '@tmtsoftware/esw-ts'
import React, { useContext } from 'react'

export interface CheckLoginProps {
  children: React.ReactNode
  error: React.ReactNode
}

const CheckLogin = ({ children, error }: CheckLoginProps): JSX.Element => {
  const { auth } = useContext(AuthContext)
  const node =
    auth && auth.isAuthenticated && auth.isAuthenticated() ? children : error
  return <div style={{ minHeight: 'inherit' }}>{node}</div>
}
export default CheckLogin
