import { RouteConfig, createHashHistory } from '@liuli-util/react-router'
import { HomeView } from '../views/HomeView'
import { HelloWorld } from '../views/HelloWorld'
import { Layout } from '../views/Layout'

export const routeList: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: HomeView },
      { path: '/hello-world', component: HelloWorld },
    ],
  },
]

export const history = createHashHistory()
