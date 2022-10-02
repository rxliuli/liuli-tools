import { RouteConfig, createHashHistory } from '@liuli-util/react-router'
import HelloWorld from '../views/HelloWorld'

export const routeList: RouteConfig[] = [
  { path: '/', redirect: '/hello-world' },
  { path: '/hello-world', component: HelloWorld },
]

export const history = createHashHistory()
