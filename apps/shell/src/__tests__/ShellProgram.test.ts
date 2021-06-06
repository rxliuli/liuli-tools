import { mkdirp, pathExists, remove, writeFile } from 'fs-extra'
import * as path from 'path'
import { ShellProgram } from '../index'

describe('测试 ShellProgram', () => {
  describe('测试 rm', () => {
    const rmDir = path.resolve(__dirname, 'temp/rm/dir/')
    const rmFile = path.resolve(__dirname, 'temp/rm/file')
    beforeEach(async () => {
      await mkdirp(rmDir)
      await writeFile(rmFile, 'test')
    })
    afterEach(() => {
      remove(path.resolve(__dirname, 'temp/rm/'))
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
})
