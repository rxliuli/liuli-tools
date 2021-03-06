import React, { ReactNode, useMemo } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { BaseHistory, RouteConfig } from './index'
import { treeMap } from '@liuli-util/tree'

interface HistoryRouterProps {
  history: BaseHistory
  fallback?: ReactNode
}

const BaseReactRouter: React.FC<HistoryRouterProps> = ({ history, children }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })

  React.useLayoutEffect(() => {
    history.listen(setState)
  }, [history])

  return React.createElement(Router, Object.assign({ children, navigator: history }, state))
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
                  item.component &&
                  (isLazy(item.component) ? (
                    <React.Suspense fallback={fallback}>
                      {React.createElement(React.lazy(item.component as any))}
                    </React.Suspense>
                  ) : (
                    React.createElement(item.component as any)
                  ))
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
