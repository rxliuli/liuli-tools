import React from 'react'
import ReactDOM from 'react-dom'
import { ReactRouter } from '@liuli-util/react-router'
import { history, routeList } from './constants/router'

ReactDOM.render(
  <React.StrictMode>
    <ReactRouter history={history} routes={routeList} />
  </React.StrictMode>,
  document.getElementById('root'),
)
