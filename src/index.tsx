import { AuthContextProvider } from '@tmtsoftware/esw-ts'
import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import GlobalSpinner from './components/spinners/globalSpinner/GlobalSpinner'
import { AppConfig } from './config/AppConfig'
import App from './containers/app/App'
import './index.module.css'
import {
  ServiceFactoryContext,
  serviceFactoryContextState
} from './contexts/serviceFactoryContext/ServiceFactoryContext'
import Routes from './routes'

render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider config={AppConfig}>
        <ServiceFactoryContext.Provider value={serviceFactoryContextState}>
          <App>
            <GlobalSpinner />
            <Routes />
          </App>
        </ServiceFactoryContext.Provider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
