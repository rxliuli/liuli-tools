import path from 'path'
import { filterMod } from './utils/findModPath'
import { readJson, writeJson } from '@liuli-util/fs-extra'
import { PackageJson } from 'type-fest'
import { AsyncArray } from '@liuli-util/async'

const mods = await filterMod(async (it) => {
  if (!it.includes('/examples/')) {
    return false
  }
  const jsonPath = path.resolve(it, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  // if (json.name.startsWith('@liuli-util/')) {
  //   return false
  // }
  if (json.private) {
    return false
  }
  return it.includes('/examples/')
})

console.log(mods)
await AsyncArray.forEach(mods, async (it) => {
  const jsonPath = path.resolve(it, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  // json.name = `@liuli-util/${json.name}`
  // json.private = true
  // await writeJson(jsonPath, json, { spaces: 2 })
})
