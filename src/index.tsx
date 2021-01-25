import { AuthContextProvider } from '@tmtsoftware/esw-ts'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { AppConfig } from './config/AppConfig'
import App from './containers/app/App'
import './index.css'
import Routes from './routes'
import { store } from './store/store'

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
