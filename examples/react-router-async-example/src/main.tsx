import React from 'react'
import { createRoot } from 'react-dom/client'
import { ReactRouter } from '@liuli-util/react-router'
import { history, routeList } from './constants/router'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactRouter history={history} routes={routeList} />
  </React.StrictMode>,
)
