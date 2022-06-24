import { AsyncArray } from '@liuli-util/async'
import { pathExists, readFile, readJson } from 'fs-extra'
import * as path from 'path'
import { parse } from 'yaml'
import { globby } from './globby'

async function parsePnpmConfig(rootPath: string): Promise<string[]> {
  const config = parse(await readFile(path.resolve(rootPath, 'pnpm-workspace.yaml'), 'utf-8'))
  return config.packages
}

async function parseNpmConfig(rootPath: string): Promise<string[]> {
  const json = await readJson(path.resolve(rootPath, 'package.json'), 'utf-8')
  return json.workspaces
}

async function parseYarnConfig(rootPath: string): Promise<string[]> {
  const json = await readJson(path.resolve(rootPath, 'package.json'), 'utf-8')
  return json.workspaces
}

async function findMonorepoConfig(rootPath: string): Promise<string[]> {
  if (await pathExists(path.resolve(rootPath, 'pnpm-lock.yaml'))) {
    return parsePnpmConfig(rootPath)
  }
  if (await pathExists(path.resolve(rootPath, 'package-lock.json'))) {
    return parseNpmConfig(rootPath)
  }
  if (await pathExists(path.resolve(rootPath, 'yarn.lock'))) {
    return parseYarnConfig(rootPath)
  }
  throw new Error('不支持的包管理器')
}

/**
 * 扫描 pnpm 的模块列表
 */
export async function scanMods(rootPath: string): Promise<string[]> {
  const packages = await findMonorepoConfig(rootPath)
  const list = await globby(packages, { cwd: rootPath })
  return await AsyncArray.filter(list, (s) => pathExists(path.resolve(rootPath, s, 'package.json')))
}
