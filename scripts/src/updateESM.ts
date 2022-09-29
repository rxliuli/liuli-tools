import { AsyncArray } from '@liuli-util/async'
import FastGlob from 'fast-glob'
import { readFile, readJson, writeFile, writeJson } from 'fs-extra'
import path from 'path'
import { PackageJson } from 'type-fest'
import { findPnpmRootPath } from './utils/findPnpmRootPath'
import { scanPnpmMods } from './utils/scanPnpmMods'
import { parse, prettyPrint, visit } from 'recast'
import tsParser from 'recast/parsers/typescript'

async function updatePackageJSON(modPath: string) {
  const jsonPath = path.resolve(modPath, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  if (json.type === 'module') {
    return
  }
  json.type = 'module'
  json.exports = {
    import: './dist/index.js',
    require: './dist/index.cjs',
  }
  delete json.main
  delete json.module
  await writeJson(jsonPath, json, { spaces: 2 })
}

async function updateBundle(modPath: string) {
  const jsonPath = path.resolve(modPath, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  if (json.devDependencies) {
    Reflect.set(json.devDependencies, 'tsup', '^6.2.3')
    Reflect.deleteProperty(json.devDependencies, '@liuli-util/cli')
  }
  if (json.scripts) {
    Object.keys(json.scripts).forEach((k) => {
      const matches = [
        ['liuli-cli build cli -w', 'tsup src/index.ts --format esm,cjs --dts && tsup src/bin.ts --format esm --watch'],
        ['liuli-cli build cli', 'tsup src/index.ts --format esm,cjs --dts && tsup src/bin.ts --format esm'],
        ['liuli-cli build lib -w', 'tsup src/index.ts --format esm,cjs --dts --watch'],
        ['liuli-cli build lib', 'tsup src/index.ts --format esm,cjs --dts'],
      ]
      matches.forEach(([o, n]) => (json.scripts[k] = json.scripts[k].replaceAll(o, n)))
    })
  }
  await writeJson(jsonPath, json, { spaces: 2 })
}

async function replaceEsnoToTsx(modPath: string) {
  const jsonPath = path.resolve(modPath, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  if (!json.devDependencies || !json.devDependencies.esno) {
    return
  }
  delete json.devDependencies.esno
  json.devDependencies.tsx = '^3.9.0'
  if (json.scripts) {
    Object.keys(json.scripts).forEach((k) => {
      const matches = [['esno', 'tsx']]
      matches.forEach(([o, n]) => (json.scripts[k] = json.scripts[k].replaceAll(o, n)))
    })
  }
  await writeJson(jsonPath, json, { spaces: 2 })
}

async function updateFsExtraImport(modPath: string) {
  if (path.basename(modPath) === 'fs-extra') {
    return
  }
  const jsonPath = path.resolve(modPath, 'package.json')
  const json = (await readJson(jsonPath)) as PackageJson
  if (!json.dependencies || !json.dependencies['fs-extra']) {
    return
  }
  delete json.devDependencies?.['@types/fs-extra']
  delete json.dependencies?.['fs-extra']
  json.dependencies['@liuli-util/fs-extra'] = 'workspace:^'
  const list = await FastGlob('src/**/*.ts', { cwd: modPath })
  function replace(code: string) {
    const ast = parse(code, { parser: require('recast/parsers/typescript') })
    visit(ast, {
      visitImportDeclaration(path) {
        if (path.node.source.value === 'fs-extra') {
          path.node.source.value = '@liuli-util/fs-extra'
        }
        return false
      },
    })
    return prettyPrint(ast, { parser: require('recast/parsers/typescript') }).code
  }
  await new AsyncArray(list.map((item) => path.resolve(modPath, item)))
    .filter(async (item) => {
      const text = await readFile(item, 'utf-8')
      return text.includes('fs-extra')
    })
    .forEach(async (item) => {
      const text = await readFile(item, 'utf-8')
      await writeFile(item, replace(text))
    })
  await writeJson(jsonPath, json, { spaces: 2 })
}

async function updateESM() {
  const rootPath = await findPnpmRootPath()
  const mods = await scanPnpmMods(rootPath)
  const list = mods
    .filter((item) => ['apps/', 'libs/'].some((s) => item.startsWith(s)))
    .map((item) => path.resolve(rootPath, item))
  const funcs = [
    // 列表
    // updatePackageJSON,
    // updateBundle,
    // replaceEsnoToTsx,
    updateFsExtraImport,
  ]
  await AsyncArray.forEach(funcs, (f) => AsyncArray.forEach(list, f))
}

updateESM()
