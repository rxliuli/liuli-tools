import { Project, Workspace } from '@yarnpkg/core'
import getWorkspaceDependents from './getWorkspaceDependents'
import { calcModuleHash } from './calcModuleHash'
import { differenceBy } from 'lodash'
import { NativePath, npath } from '@yarnpkg/fslib'
import { BuildCache, WorkspaceCacheInfo } from './BuildCache'
import simpleGit from 'simple-git'
import { asyncLimiting } from './asyncLimiting'

export type CacheWorkspace = {
  updateCache(): Promise<void>
  workspaces: Workspace[]
}

/**
 * 获取所有改变的模块
 * @param project
 * @param cmd
 */
export async function listChangedWorkspaces(
  project: Project,
  cmd: string,
): Promise<CacheWorkspace> {
  const buildCache = new BuildCache(npath.fromPortablePath(project.cwd))
  const last = await buildCache.get(cmd)
  const current = await Promise.all(
    project.workspaces.map(
      asyncLimiting(async (item) => {
        const git = simpleGit()
        return {
          ...(await calcModuleHash(npath.fromPortablePath(item.cwd), git)),
          cwd: npath.fromPortablePath(item.cwd),
        } as WorkspaceCacheInfo
      }, 1),
    ),
  )
  // await writeJson(
  //   path.resolve(npath.fromPortablePath(project.cwd), '.yarn-cache-debug.json'),
  //   {
  //     cacheInfo,
  //     current,
  //   },
  // )
  // console.log('cacheInfo: ', cacheInfo, current)
  const addOrUpdateWorkspaceCwdSet = new Set(
    differenceBy(current, last, (item) => JSON.stringify(item)).map(
      (item) => item.cwd as NativePath,
    ),
  )

  // console.log('addOrUpdateWorkspaceCwdSet: ', addOrUpdateWorkspaceCwdSet)
  const workspaces = new Set<Workspace>()

  for (const item of project.workspaces) {
    const changed = addOrUpdateWorkspaceCwdSet.has(
      npath.fromPortablePath(item.cwd),
    )

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
      await buildCache.set(cmd, current)
    },
  }
}
