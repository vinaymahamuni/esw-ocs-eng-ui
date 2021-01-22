import { Login, Logout } from '@tmtsoftware/esw-ts'
import React from 'react'

const NavComponent = (): JSX.Element => {
  return (
    <nav className='indigo'>
      <div className='nav-wrapper'>
        <a href='https://www.tmt.org/' className='brand-logo'>
          TMT
        </a>
        <Login />
        <Logout />
      </div>
    </nav>
  )
}

export default NavComponent
