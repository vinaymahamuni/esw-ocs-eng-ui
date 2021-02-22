import { AuthContextProvider } from '@tmtsoftware/esw-ts'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalSpinner from './components/spinners/globalSpinner/GlobalSpinner'
import { AppConfig } from './config/AppConfig'
import App from './containers/app/App'
import './index.module.css'
import { ServiceFactoryProvider } from './contexts/serviceFactoryContext/ServiceFactoryContext'
import Routes from './routes'

render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider config={AppConfig}>
        <ServiceFactoryProvider>
          <App>
            <GlobalSpinner />
            <Routes />
          </App>
        </ServiceFactoryProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
