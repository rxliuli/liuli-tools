import * as path from 'path'
import { move, remove, writeFile } from 'fs-extra'
import {
  calcModuleHash,
  getLastCommit,
  getStatus,
  git,
} from '../calcModuleHash'

const oldPath = path.resolve(__dirname, 'asset/test-delete.json')
const newPath = path.resolve(__dirname, 'asset/test-delete.bak.json')

describe('测试获取最后一个 commit', () => {
  const testFilePath = path.resolve(__dirname, 'test.create.json')
  beforeEach(() => writeFile(testFilePath, ''))
  afterEach(() => remove(testFilePath))
  it('新建的文件', async () => {
    expect(await getLastCommit(path.resolve(testFilePath))).toBeNull()
  })
  it('已存在但修改的文件', async () => {
    expect(await getLastCommit(path.resolve(__dirname))).not.toBeNull()
  })
  it.skip('已存在但删除的文件（已删除的模块不需要获取 git 提交）', async () => {
    await move(oldPath, newPath)
    try {
      expect(await getLastCommit(oldPath)).toBeNull()
    } finally {
      await move(newPath, oldPath)
    }
  })
})

describe('测试获取模块中变更的文件', () => {
  const testFilePath = path.resolve(__dirname, 'test.create.json')
  beforeEach(() => writeFile(testFilePath, ''))
  afterEach(() => remove(testFilePath))
  it('测试没有变更的文件', async () => {
    expect(
      (await getStatus(path.resolve(__dirname, 'asset/test-delete.json')))
        .length === 0,
    ).toBeTruthy()
  })
  it('新建的文件', async () => {
    expect((await getStatus(testFilePath)).length).toBe(1)
  })
  it('已存在但修改的文件', async () => {
    expect((await getStatus(path.resolve(__dirname))).length).toBeGreaterThan(0)
  })
})

describe('测试获取模块的变更', () => {
  it('没有修改', async () => {
    const res = await calcModuleHash(path.resolve(__dirname, 'asset'))
    expect(res.lastCommit).not.toBeNull()
    expect(res.changed.length).toBe(0)
  })
  it('包含修改', async () => {
    const testFilePath = path.resolve(__dirname, 'asset/test.create.json')
    await writeFile(testFilePath, '')
    await move(oldPath, newPath)
    try {
      const res = await calcModuleHash(path.resolve(__dirname, 'asset'))
      expect(res.changed.length).toBe(3)
    } finally {
      await remove(testFilePath)
      await move(newPath, oldPath)
    }
  })
  it('测试真实模块', async () => {
    const realModulePath = path.resolve(
      'C:/Users/rxliuli/Code/Pkg/liuli-tools/apps/shell',
    )
    await git.cwd(realModulePath)
    const res = await calcModuleHash(realModulePath)
    console.log(res)
  })
  it('测试 path.resolve', () => {
    const res = path.resolve(
      'C:\\Users\\rxliuli\\Code\\Pkg\\liuli-tools',
      'apps/liuli-cli/package.json',
    )
    console.log(res)
  })
})
