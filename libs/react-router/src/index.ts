import {
  createHashHistory as _createHashHistory,
  createBrowserHistory as _createBrowserHistory,
  createMemoryHistory as _createMemoryHistory,
  History,
} from 'history'
import { useMemo } from 'react'
import { useActionData, useLocation, useNavigate } from 'react-router-dom'

function stringify(query: object): string {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((item) => params.append(k, item))
    } else {
      params.set(k, v)
    }
  })
  return params.toString()
}

export interface BaseHistory extends Omit<History, 'push' | 'replace'> {
  push(url: string): void
  push(options: { pathname: string; query: object }): void
  replace(url: string): void
  replace(options: { pathname: string; query: object }): void
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
export function createBrowserHistory(): BaseHistory {
  return proxyHistory(_createBrowserHistory())
}
export function createMemoryHistory(): BaseHistory {
  return proxyHistory(_createMemoryHistory())
}

export { Link, Outlet as RouterView, useSearchParams, useLocation, useMatch, useParams } from 'react-router-dom'

export * from './component'
export * from './model'

export function useRouter(): Pick<BaseHistory, 'back' | 'forward' | 'go' | 'push' | 'replace' | 'location'> {
  const navigate = useNavigate()
  const location = useLocation()
  return useMemo(
    () => ({
      back() {
        navigate(-1)
      },
      forward() {
        navigate(1)
      },
      go(delta) {
        navigate(delta)
      },
      location,
      push(url: string | { pathname: string; query: object }) {
        if (typeof url === 'string') {
          navigate(url)
        } else {
          navigate(url.pathname + (url.query ? '?' + stringify(url.query) : ''))
        }
      },
      replace(url: string | { pathname: string; query: object }) {
        if (typeof url === 'string') {
          navigate(url, { replace: true })
        } else {
          navigate(url.pathname + (url.query ? '?' + stringify(url.query) : ''), { replace: true })
        }
      },
    }),
    [navigate, location],
  )
}
