import { RouteConfig, createHashHistory } from '@liuli-util/react-router'
import { Navigate } from 'react-router-dom'
import HelloWorld from '../views/HelloWorld'

export const routeList: RouteConfig[] = [
  { path: '/', component: () => <Navigate replace={true} to={'/hello-world'} /> },
  { path: '/hello-world', component: HelloWorld },
]

export const history = createHashHistory()
