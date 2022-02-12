import React from 'react'
import ReactDOM from 'react-dom'
import { history, routeList } from './constants/router'
import { ReactRouter } from '@liuli-util/react-router'

ReactDOM.render(
  <React.StrictMode>
    <ReactRouter history={history} routes={routeList} />
  </React.StrictMode>,
  document.getElementById('root'),
)
