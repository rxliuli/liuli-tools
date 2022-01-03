import React, { createElement } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { BaseHistory, RouteConfig } from './index'
import { treeMap } from '@liuli-util/tree'

interface HistoryRouterProps {
  history: BaseHistory
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

export const ReactRouter: React.FC<HistoryRouterProps & { routes: RouteConfig[] }> = ({ history, routes }) => {
  return (
    <BaseReactRouter history={history}>
      <Routes>
        {treeMap(
          routes,
          (item, key) => (
            <Route
              key={key.join(',')}
              path={item.path}
              element={item.component && createElement(item.component)}
              children={item.children}
            />
          ),
          {
            id: 'path',
            children: 'children',
          },
        )}
      </Routes>
    </BaseReactRouter>
  )
}
