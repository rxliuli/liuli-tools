import { mkdirp, pathExists, remove, writeFile } from 'fs-extra'
import * as path from 'path'
import { ShellProgram } from '../index'
import { AsyncArray } from '@liuli-util/async'

describe('测试 ShellProgram', () => {
  class TestFileCreator {
    constructor(public readonly rootDir: string) {}
    async init() {
      await remove(this.rootDir)
      await mkdirp(this.rootDir)
    }
    async file(filePath: string) {
      const res = this.resolve(filePath)
      await writeFile(res, '')
      return res
    }
    async dir(dirPath: string) {
      const res = this.resolve(dirPath)
      await mkdirp(res)
      return res
    }
    resolve(filePath: string) {
      return path.resolve(this.rootDir, filePath)
    }
  }

  describe('测试 rm', () => {
    const creator = new TestFileCreator(path.resolve(__dirname, 'temp/rm'))
    let rmDir: string
    let rmFile: string
    beforeEach(async () => {
      await creator.init()
      rmDir = await creator.dir('dist')
      rmFile = await creator.file('test.json')
    })
    it('删除多个指定目录', async () => {
      await ShellProgram.remove([rmDir, rmFile])
      expect(await pathExists(rmDir)).toBeFalsy()
      expect(await pathExists(rmFile)).toBeFalsy()
    })
    it('删除不存在的目录', async () => {
      await ShellProgram.remove([path.resolve(__dirname, 'temp/rm/notExists')])
    })
  })

  function testOp(fn: typeof ShellProgram.copy | typeof ShellProgram.move) {
    const isCopy = fn === ShellProgram.copy
    const title = isCopy ? '复制' : '移动'
    const creator = new TestFileCreator(
      path.resolve(__dirname, `temp/${isCopy ? 'cp' : 'mv'}`),
    )

    beforeEach(() => creator.init())
    it(`测试${title}文件`, async () => {
      const file = await creator.file('test.json')
      const dest = await creator.dir('dist')
      await ShellProgram.copy([file, dest])
      expect(
        await pathExists(path.resolve(dest, path.basename(file))),
      ).toBeTruthy()
    })
    it(`测试${title}并重命名`, async () => {
      const src = await creator.dir('public')
      const dest = await creator.dir('dist')
      await ShellProgram.copy([src, path.resolve(dest, 'static')])
      expect(await pathExists(path.resolve(dest, 'static'))).toBeTruthy()
    })
    it(`测试${title}多个文件`, async () => {
      const dir = await creator.dir('public')
      const file = await creator.file('test.json')
      const dest = await creator.dir('dist')
      await ShellProgram.copy([dir, file, dest])
      await AsyncArray.forEach([dir, file], async (filePath) =>
        expect(
          await pathExists(path.resolve(dest, path.basename(filePath))),
        ).toBeTruthy(),
      )
    })
    it(`测试${title}的目标位置不存在的情况`, async () => {
      const dir = await creator.dir('public')
      const file = await creator.file('test.json')
      const dest = creator.resolve('dist')
      await ShellProgram.copy([dir, file, dest])
      await AsyncArray.forEach([dir, file], async (filePath) =>
        expect(
          await pathExists(path.resolve(dest, path.basename(filePath))),
        ).toBeTruthy(),
      )
    })
  }

  describe('测试 cp', () => {
    testOp(ShellProgram.copy)
  })
  describe('测试 mv', () => {
    testOp(ShellProgram.move)
  })

  it('测试 mkdir', async () => {
    const creator = new TestFileCreator(path.resolve(__dirname, 'temp/mkdir'))
    const dirs = Array(10)
      .fill(0)
      .map((_, i) => creator.resolve(i.toString()))
    await ShellProgram.mkdir(dirs)
    await AsyncArray.forEach(dirs, async (file) => {
      expect(await pathExists(file)).toBeTruthy()
    })
  })
})
