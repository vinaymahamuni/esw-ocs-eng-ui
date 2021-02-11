import { AuthContext } from '@tmtsoftware/esw-ts'
import React, { useContext } from 'react'

export interface CheckLoginProps {
  children: React.ReactNode
  fallbackComponent: React.ReactNode
}

const CheckLogin = ({
  children,
  fallbackComponent
}: CheckLoginProps): JSX.Element => {
  const { auth } = useContext(AuthContext)
  const node =
    auth && auth.isAuthenticated && auth.isAuthenticated()
      ? children
      : fallbackComponent
  return <div style={{ minHeight: 'inherit' }}>{node}</div>
}
export default CheckLogin
