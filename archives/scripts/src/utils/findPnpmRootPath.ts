import { pathExists } from '@liuli-util/fs-extra'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { findParent } from './findParent'

export async function findPnpmRootPath() {
  return (await findParent(path.dirname(fileURLToPath(import.meta.url)), (s) =>
    pathExists(path.resolve(s, 'pnpm-workspace.yaml')),
  ))!
}
