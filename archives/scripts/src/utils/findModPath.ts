import { AsyncArray } from '@liuli-util/async'
import { readFile } from 'fs/promises'
import path from 'path'
import { findPnpmRootPath } from './findPnpmRootPath'
import { scanPnpmMods } from './scanPnpmMods'

export async function findMod(name: string) {
  const r = await filterMod(
    async (it) => JSON.parse(await readFile(path.resolve(it, 'package.json'), 'utf-8')).name === name,
  )
  if (r.length === 0) {
    throw new Error(`找不到模块 ${name}`)
  }
  return r[0]
}

export async function filterMod(f?: (fsPath: string) => Promise<boolean>) {
  const rootPath = await findPnpmRootPath()
  const mods = await scanPnpmMods(rootPath)
  if (!f) {
    return mods
  }
  return await AsyncArray.filter(
    mods.map((it) => path.resolve(rootPath, it)),
    f,
  )
}
