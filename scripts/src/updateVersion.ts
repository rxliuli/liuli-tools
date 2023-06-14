import { AsyncArray } from '@liuli-util/async'
import { readJson, writeJson } from '@liuli-util/fs-extra'
import path from 'path'
import { PackageJson } from 'type-fest'
import { findPnpmRootPath } from './utils/findPnpmRootPath'
import { scanPnpmMods } from './utils/scanPnpmMods'

async function updateExport(jsonPath: string) {
  const json = (await readJson(jsonPath)) as PackageJson
  json.exports = {} as { [key in PackageJson.ExportCondition]: string }
  json.exports.import = json.module
  json.exports.require = json.main
  json.exports.types = json.types
  await writeJson(jsonPath, json, { spaces: 2 })
}

function updateMinor(version: string) {
  const r = version.split('.')
  r[1] = (Number.parseInt(r[1]) + 1).toString()
  r[2] = '0'
  return r.join('.')
}

async function updateVersion(jsonPath: string) {
  const json = (await readJson(jsonPath)) as PackageJson
  json.version = updateMinor(json.version)
  await writeJson(jsonPath, json, { spaces: 2 })
}

async function updateEsmSupport() {
  const rootPath = await findPnpmRootPath()
  const list = (await scanPnpmMods(rootPath)).map((item) => path.resolve(rootPath, item, 'package.json'))
  const r = await AsyncArray.filter(list, async (jsonPath) => {
    const json = (await readJson(jsonPath)) as PackageJson
    return !!((json.exports || json.bin) && !json.private)
  })
  // console.log(r)
  // await update(r[0])
  await AsyncArray.forEach(r, updateVersion)
  const names = await AsyncArray.map(r, async (item) => {
    const json = (await readJson(item)) as PackageJson
    return json.name
  })
  console.log('pnpm ' + names.map((s) => `--filter ${s}`).join(' ') + ' publish')
}

// updateEsmSupport()
