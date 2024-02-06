import { AsyncArray } from '@liuli-util/async'
import { readJson } from '@liuli-util/fs-extra'
import path from 'path'
import semver from 'semver'
import { PackageJson } from 'type-fest'
import { findPnpmRootPath } from './utils/findPnpmRootPath'
import { scanPnpmMods } from './utils/scanPnpmMods'
import latestVersion from 'latest-version'

const { lt } = semver

async function checkVersion() {
  const rootPath = await findPnpmRootPath()
  const list = (await scanPnpmMods(rootPath))
    .filter((item) => ['apps/', 'libs/'].some((s) => item.startsWith(s)))
    .map((item) => path.resolve(rootPath, item))
  const r = (
    await new AsyncArray(list)
      .filter(async (item) => {
        const json = (await readJson(path.resolve(item, 'package.json'))) as PackageJson
        if (json.private || !json.publishConfig) {
          return false
        }
        return true
      })
      .map(async (item) => {
        const json = (await readJson(path.resolve(item, 'package.json'))) as PackageJson
        return {
          name: json.name,
          version: json.version,
          online: await latestVersion(json.name),
        }
      })
  ).filter((item) => lt(item.online, item.version))
  console.log(
    'pnpm ' +
      r
        .map((item) => item.name)
        .map((s) => `--filter ${s} `)
        .join('') +
      'publish',
  )
}

checkVersion()
