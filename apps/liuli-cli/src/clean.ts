import { pathExists, remove } from 'fs-extra'
import * as path from 'path'

export async function clean() {
  const distPath = path.resolve('./dist')
  if (await pathExists(distPath)) {
    await remove(distPath)
  }
}
