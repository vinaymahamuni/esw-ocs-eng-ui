import { AuthContextProvider } from '@tmtsoftware/esw-ts'
import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner'
import { AppConfig } from './config/AppConfig'
import App from './containers/app/App'
import './index.module.css'
import Routes from './routes'
import { startMocks } from './mocks/mocks'

startMocks()

render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider config={AppConfig}>
        <App>
          <GlobalSpinner />
          <Routes />
        </App>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
