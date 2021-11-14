import { isIncludeDep, isNpmPackage, isYarnRoot, isYarnSubModule } from '../when'
import { pathExists, readJson } from 'fs-extra'
import { PackageJson } from 'type-fest'
import path from 'path'
import { findParent } from '../../../utils'

describe('测试 when', () => {
  let rootPath: string
  let subModulePath: string
  beforeAll(async () => {
    rootPath = (await findParent(__dirname, async (dir) => {
      const jsonPath = path.resolve(dir, 'package.json')
      return (await pathExists(jsonPath)) && !!((await readJson(jsonPath)) as PackageJson).workspaces
    }))!
    subModulePath = (await findParent(__dirname, async (dir) => pathExists(path.join(dir, 'package.json'))))!
  })
  it('测试 isNpmPackage', async () => {
    expect(await isNpmPackage(subModulePath)).toBeTruthy()
    expect(await isNpmPackage(rootPath)).toBeTruthy()
    expect(await isNpmPackage(__dirname)).toBeFalsy()
  })
  it.skip('测试 isYarnRoot', async () => {
    expect(await isYarnRoot(rootPath)).toBeTruthy()
    expect(await isYarnRoot(subModulePath)).toBeFalsy()
  })
  it.skip('测试 isYarnSubModule', async () => {
    expect(await isYarnSubModule(subModulePath)).toBeTruthy()
    expect(await isYarnSubModule(rootPath)).toBeFalsy()
    expect(await isYarnSubModule(__dirname)).toBeFalsy()
  })
  it('测试 isIncludeDep', async () => {
    expect(await isIncludeDep(['vue'], path.resolve(__dirname, 'temp'))).toBeFalsy()
  })
})
