import { fileURLToPath } from 'url'
import { expect, it, describe, beforeAll } from 'vitest'
import { isIncludeDep, isNpmPackage, isYarnRoot, isYarnSubModule } from '../when'
import { pathExists } from '@liuli-util/fs-extra'
import * as path from 'path'
import { findParent } from '../../../utils'

describe('测试 when', () => {
  let rootPath: string
  let subModulePath: string

  beforeAll(async () => {
    rootPath = (await findParent(path.dirname(fileURLToPath(import.meta.url)), (dir) =>
      pathExists(path.resolve(dir, 'pnpm-workspace.yaml')),
    ))!
    subModulePath = (await findParent(path.dirname(fileURLToPath(import.meta.url)), async (dir) =>
      pathExists(path.join(dir, 'package.json')),
    ))!
  })

  it('测试 isNpmPackage', async () => {
    expect(await isNpmPackage(subModulePath)).toBeTruthy()
    expect(await isNpmPackage(rootPath)).toBeTruthy()
    expect(await isNpmPackage(path.dirname(fileURLToPath(import.meta.url)))).toBeFalsy()
  })

  it.skip('测试 isYarnRoot', async () => {
    expect(await isYarnRoot(rootPath)).toBeTruthy()
    expect(await isYarnRoot(subModulePath)).toBeFalsy()
  })

  it.skip('测试 isYarnSubModule', async () => {
    expect(await isYarnSubModule(subModulePath)).toBeTruthy()
    expect(await isYarnSubModule(rootPath)).toBeFalsy()
    expect(await isYarnSubModule(path.dirname(fileURLToPath(import.meta.url)))).toBeFalsy()
  })

  it('测试 isIncludeDep', async () => {
    expect(await isIncludeDep(['vue'], path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'temp'))).toBeFalsy()
  })
})
