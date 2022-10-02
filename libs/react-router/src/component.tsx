import React, { PropsWithChildren, ReactNode, useMemo } from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { BaseHistory } from './index'
import { treeMap } from '@liuli-util/tree'
import { RouteConfig } from './model'

interface HistoryRouterProps {
  history: BaseHistory
  fallback?: ReactNode
}

function BaseReactRouter({ history, children }: PropsWithChildren<HistoryRouterProps>) {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })

  React.useLayoutEffect(() => {
    history.listen(setState)
  }, [history])

  return (
    <Router navigator={history} {...state}>
      {children}
    </Router>
  )
}

function isLazy(thing: any) {
  return typeof thing === 'function' && /\(.*\)[ \n]*=>[ \n]*import(.+)/.test(thing.toString() as string)
}

export const ReactRouter: React.FC<HistoryRouterProps & { routes: RouteConfig[] }> = (props) => {
  const fallback = useMemo(() => props.fallback ?? '...', [props])
  return (
    <BaseReactRouter history={props.history}>
      <Routes>
        {treeMap(
          props.routes,
          (item, key) => {
            return (
              <Route
                key={key.join(',')}
                path={item.path}
                element={
                  item.redirect ? (
                    <Navigate replace={true} to={item.redirect}></Navigate>
                  ) : (
                    item.component &&
                    (isLazy(item.component) ? (
                      <React.Suspense fallback={fallback}>
                        {React.createElement(React.lazy(item.component as any))}
                      </React.Suspense>
                    ) : (
                      React.createElement(item.component as any)
                    ))
                  )
                }
                children={item.children}
              />
            )
          },
          {
            id: 'path',
            children: 'children',
          },
        )}
      </Routes>
    </BaseReactRouter>
  )
}
