import React, { createElement } from 'react'
import { createHashHistory as _createHashHistory, History } from 'history'
import { stringify } from 'qs'

export interface RouteConfig {
  path: string
  component?: React.FC
  children?: RouteConfig[]
}

export interface BaseHistory extends Omit<History, 'push'> {
  push(url: string): void
  push(options: { pathname: string; query: object }): void
}

function proxyHistory(history: History): BaseHistory {
  return new Proxy(history, {
    get(target: History, p: string | symbol, receiver: any): any {
      const res = Reflect.get(target, p, receiver)
      if (p !== 'push' && p !== 'replace') {
        return res
      }
      return (url: string | { pathname: string; query: object }) => {
        if (typeof url === 'string') {
          res(url)
        } else {
          res(url.pathname + (url.query ? '?' + stringify(url.query) : ''))
        }
      }
    },
  })
}

export function createHashHistory(): BaseHistory {
  return proxyHistory(_createHashHistory())
}

export { Link, Outlet as RouterView } from 'react-router-dom'

export * from './component'
