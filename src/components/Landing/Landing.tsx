import React from 'react'
import logo from '../../assets/images/tmt_logo.png'
import './Landing.css'

const Landing = (): JSX.Element => {
  return (
    <div>
      <img className='logo' alt='logo' src={logo} />
      <h3>Update src/App.tsx and save to reload.</h3>

      <h3>
        Refer ESW-TS library usage from{' '}
        <a className='link' href='https://github.com/tmtsoftware/esw-ts'>
          here.
        </a>
      </h3>
    </div>
  )
}

export default Landing
