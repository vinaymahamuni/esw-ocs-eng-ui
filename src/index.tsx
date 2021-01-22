import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import App from './containers/app/App'
import './index.css'
import Routes from './routes'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AuthContextProvider } from '@tmtsoftware/esw-ts'
import { AppConfig } from './config/AppConfig'
render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AuthContextProvider config={AppConfig}>
          <App>
            <Routes />
          </App>
        </AuthContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
