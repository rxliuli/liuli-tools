import { pathExists, readJson } from '@liuli-util/fs-extra'
import * as path from 'path'
import { PackageJson } from 'type-fest'
import { findParent } from '../../utils'

/**
 * 判断是否包含 package.json
 * @param cwd
 */
export async function isNpmPackage(cwd: string = process.cwd()): Promise<boolean> {
  return await pathExists(path.resolve(cwd, './package.json'))
}

/**
 * 判断是 yarn2 monorepo 项目
 * @param cwd
 */
export async function isYarnRoot(cwd: string = process.cwd()): Promise<boolean> {
  if (!(await isNpmPackage(cwd))) {
    return false
  }

  const json = (await readJson(path.resolve(cwd, './package.json'))) as PackageJson
  return !!json.workspaces
}

/**
 * 判断是 yarn2 monorepo 的子模块
 */
export async function isYarnSubModule(cwd: string = process.cwd()): Promise<boolean> {
  if (!(await isNpmPackage(cwd))) {
    return false
  }

  //如果是 yarn monorepo 根模块则直接返回 true
  if (await isYarnRoot(cwd)) {
    return false
  }

  return (await findParent(path.dirname(cwd), isYarnRoot)) !== null
}

/**
 * 是否包含指定依赖
 * @param deps
 * @param cwd
 */
export async function isIncludeDep(deps: string[], cwd: string = process.cwd()): Promise<boolean> {
  if (!(await isNpmPackage(cwd))) {
    return false
  }

  const json = (await readJson(path.resolve(cwd, './package.json'))) as PackageJson

  const set = new Set(
    Object.keys({
      ...json.dependencies,
      ...json.devDependencies,
    }),
  )

  return deps.every((dep) => set.has(dep))
}
