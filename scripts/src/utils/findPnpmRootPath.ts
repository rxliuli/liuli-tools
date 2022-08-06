import { pathExists } from 'fs-extra'
import * as path from 'path'
import { findParent } from './findParent'

export async function findPnpmRootPath() {
  return (await findParent(__dirname, (s) => pathExists(path.resolve(s, 'pnpm-workspace.yaml'))))!
}
