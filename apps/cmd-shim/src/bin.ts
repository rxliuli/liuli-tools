import { linkGlobalBin, readBinList } from './index'
import * as path from 'path'
import { AsyncArray } from '@liuli-util/async'
import { pathExists, readJson } from 'fs-extra'
import { PackageJson } from 'type-fest'
import { execPromise } from './utils/execPromise'

async function main() {
  const pkgPath = path.resolve(path.resolve(), 'package.json')
  if (!(await pathExists(pkgPath))) {
    return
  }
  const pkgJson = (await readJson(pkgPath)) as PackageJson
  const binList = readBinList(path.resolve(), pkgJson)
  const globalBinPath = ((await execPromise('npm -g bin')) as string).trimEnd()
  await AsyncArray.forEach(binList, async (config) => {
    await linkGlobalBin(globalBinPath, config)
    console.log(`linked: ${path.resolve(globalBinPath, config.name)}`)
  })
}

main()
