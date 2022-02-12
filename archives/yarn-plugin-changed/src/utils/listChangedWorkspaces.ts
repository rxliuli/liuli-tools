import { Project, Workspace } from '@yarnpkg/core'
import getWorkspaceDependents from './getWorkspaceDependents'
import { calcModuleHash } from './calcModuleHash'
import { differenceBy, uniqBy } from 'lodash'
import { NativePath, npath } from '@yarnpkg/fslib'
import { BuildCache, WorkspaceCacheInfo } from './BuildCache'
import { FilterOptions, filterWorkspaces } from './filterWorkspaces'

export type CacheWorkspace = {
  updateCache(): Promise<void>
  workspaces: Workspace[]
}

/**
 * 获取所有改变的模块
 * @param project
 * @param cmd
 * @param include
 * @param exclude
 */
export async function listChangedWorkspaces({
  project,
  cmd,
  include,
  exclude,
}: {
  project: Project
  cmd: string
} & FilterOptions): Promise<CacheWorkspace> {
  const rootPath = npath.fromPortablePath(project.cwd)
  const buildCache = new BuildCache(rootPath)
  const last = await buildCache.get(cmd)
  const current = await Promise.all(
    filterWorkspaces({
      workspaces: project.workspaces,
      include,
      exclude,
    }).map(async (item) => {
      return {
        ...(await calcModuleHash(rootPath, npath.fromPortablePath(item.cwd))),
        cwd: npath.fromPortablePath(item.cwd),
      } as WorkspaceCacheInfo
    }),
  )
  const addOrUpdateWorkspaceCwdSet = new Set(
    differenceBy(current, last, (item) => JSON.stringify(item)).map((item) => item.cwd as NativePath),
  )

  const workspaces = new Set<Workspace>()
  for (const item of project.workspaces) {
    const changed = addOrUpdateWorkspaceCwdSet.has(npath.fromPortablePath(item.cwd))

    if (changed && !workspaces.has(item)) {
      workspaces.add(item)

      for (const dep of getWorkspaceDependents(item)) {
        workspaces.add(dep)
      }
    }
  }

  return {
    workspaces: [...workspaces],
    async updateCache() {
      await buildCache.set(
        cmd,
        uniqBy([...current, ...last], (item) => item.cwd),
      )
    },
  }
}
