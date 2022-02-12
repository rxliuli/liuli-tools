import { structUtils, Workspace } from '@yarnpkg/core'

/**
 * 过滤器
 */
export interface FilterOptions {
  include?: string[]
  exclude?: string[]
}

/**
 * 根据 include/exclude 过滤 workspaces
 * @param workspaces
 * @param include
 * @param exclude
 */
export function filterWorkspaces({
  workspaces,
  include = [],
  exclude = [],
}: {
  workspaces: Workspace[]
} & FilterOptions): Workspace[] {
  return workspaces.filter((ws) => {
    const name = structUtils.stringifyIdent(ws.locator)

    if (name) {
      if (include.length && !include.includes(name)) {
        return false
      }

      if (exclude.length && exclude.includes(name)) {
        return false
      }
    }
    return true
  })
}
