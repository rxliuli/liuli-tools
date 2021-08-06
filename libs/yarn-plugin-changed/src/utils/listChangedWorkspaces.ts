import { Project, Workspace } from '@yarnpkg/core'
import getWorkspaceDependents from './getWorkspaceDependents'
import * as path from 'path'
import { calcModuleHash, ModuleHash } from './calcModuleHash'
import { pathExists, readJson, writeJson } from 'fs-extra'
import { differenceBy } from 'lodash'
import { npath } from '@yarnpkg/fslib'

type WorkspaceCacheInfo = ModuleHash & Pick<Workspace, 'cwd'>

type CacheInfo = {
  last: WorkspaceCacheInfo[]
}

export type CacheWorkspace = {
  updateCache(): Promise<void>
  workspaces: Workspace[]
}

export async function listChangedWorkspaces(
  project: Project,
): Promise<CacheWorkspace> {
  const cachePath = path.resolve(
    npath.fromPortablePath(project.cwd),
    '.yarn-cache.json',
  )
  if (!(await pathExists(cachePath))) {
    await writeJson(cachePath, {
      last: [] as WorkspaceCacheInfo[],
    })
  }
  const cacheInfo = (await readJson(cachePath)) as CacheInfo
  const last = cacheInfo.last
  const current = await Promise.all(
    project.workspaces.map(async (item) => {
      return {
        ...(await calcModuleHash(npath.fromPortablePath(item.cwd))),
        cwd: npath.fromPortablePath(item.cwd),
      } as WorkspaceCacheInfo
    }),
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
      (item) => item.cwd,
    ),
  )

  // console.log('addOrUpdateWorkspaceCwdSet: ', addOrUpdateWorkspaceCwdSet)
  const workspaces = new Set(
    project.workspaces.filter((item) =>
      addOrUpdateWorkspaceCwdSet.has(item.cwd),
    ),
  )

  for (const item of project.workspaces) {
    const changed = addOrUpdateWorkspaceCwdSet.has(item.cwd)

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
      await writeJson(cachePath, {
        last: current,
      } as CacheInfo)
    },
  }
}
