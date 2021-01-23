import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import App from './containers/app/App'
import './index.css'
import Routes from './routes'

render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes />
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
