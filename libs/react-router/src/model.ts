import { ComponentType } from 'react'

export interface RouteConfig {
  path: string
  redirect?: string
  component?: React.FC | (() => Promise<{ default: ComponentType<any> }>)
  children?: RouteConfig[]
}
