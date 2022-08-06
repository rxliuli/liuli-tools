/*
迁移 ts-node 为更高效的 esno
*/

import { readJson, writeJson } from 'fs-extra'
import * as path from 'path'
import { PackageJson } from 'type-fest'

async function tsNodeToEsno(base: string) {
  const pkgPath = path.resolve(base, 'package.json')
  const pkgJSON = (await readJson(pkgPath)) as PackageJson
  if (!pkgJSON.devDependencies?.['ts-node']) {
    return
  }
  Reflect.deleteProperty(pkgJSON.devDependencies, 'ts-node')
  pkgJSON.devDependencies['esno'] = '^0.9.1'
  if (pkgJSON.scripts) {
    Object.entries(pkgJSON.scripts).forEach(([k, v]) => {
      pkgJSON.scripts[k] = v.replace(new RegExp('ts-node ', 'g'), 'esno ')
    })
  }
  await writeJson(pkgPath, pkgJSON, { spaces: 2 })

  const tsconfigPath = path.resolve(base, 'tsconfig.json')
  const tsconfigJson = await readJson(tsconfigPath)
  if (!tsconfigJson['ts-node']) {
    return
  }
  Reflect.deleteProperty(tsconfigJson, 'ts-node')
  await writeJson(tsconfigPath, tsconfigJson, { spaces: 2 })
}

tsNodeToEsno(path.resolve())
