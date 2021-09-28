import { Project, Workspace } from '@yarnpkg/core'
import { AsyncArray } from '@liuli-util/async'
import { npath } from '@yarnpkg/fslib'
import * as path from 'path'
import { readJson } from 'fs-extra'
import { PackageJson } from 'type-fest'

export async function listChangedModule(
  project: Project,
): Promise<Workspace[]> {
  return await AsyncArray.filter(project.workspaces, async (workspace) => {
    const modulePath = npath.fromPortablePath(workspace.cwd)
    const pkgPath = path.resolve(modulePath, 'package.json')
    const pkgJson = (await readJson(pkgPath)) as PackageJson & {
      gitHead?: string
    }
    //如果不存在，则认为不需要发布
    if (pkgJson.private || !pkgJson.gitHead) {
      return false
    }
    return true
  })
}
