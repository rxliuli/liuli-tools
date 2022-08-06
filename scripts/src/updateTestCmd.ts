import { AsyncArray } from '@liuli-util/async'
import FastGlob from 'fast-glob'
import { readJson, writeJson } from 'fs-extra'
import path from 'path'
import { PackageJson } from 'type-fest'
import { findPnpmRootPath } from './utils/findPnpmRootPath'
import { scanPnpmMods } from './utils/scanPnpmMods'

async function updateTestCmd() {
  const rootPath = await findPnpmRootPath()
  const list = await AsyncArray.filter(await scanPnpmMods(rootPath), async (name) => {
    const modPath = path.resolve(rootPath, name)
    const json = (await readJson(path.resolve(modPath, 'package.json'))) as PackageJson
    return Object.keys(json.devDependencies ?? {}).includes('jest')
  })
  // console.log(list)
  await AsyncArray.forEach(list, async (name) => {
    const modPath = path.resolve(rootPath, name)
    const jsonPath = path.resolve(modPath, 'package.json')
    const json = (await readJson(jsonPath)) as PackageJson
    if (json.scripts.test) {
      return
    }
    json.scripts.test = 'jest --all'
    await writeJson(jsonPath, json, { spaces: 2 })
  })
}

// updateTestCmd()
