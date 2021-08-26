import { GenerateProgram, TemplateTypeEnum } from '../GenerateProgram'
import path from 'path'
import {
  mkdir,
  pathExists,
  readFile,
  readJson,
  remove,
  writeFile,
  writeJson,
} from 'fs-extra'
import { PackageJson } from 'type-fest'

describe('测试 InitProgram', () => {
  const initProgram = new GenerateProgram()
  const tempPath = path.resolve(__dirname, 'temp')
  it('生成项目', async () => {
    const dest = path.resolve(tempPath, 'lib-demo')
    await remove(dest)
    await initProgram.generate({
      template: TemplateTypeEnum.Lib,
      dest,
    })
    expect(await pathExists(dest)).toBeTruthy()
  }, 100_000)
  describe('测试一些钩子', () => {
    beforeAll(async () => {
      await remove(tempPath)
      await mkdir(tempPath)
    })
    it('测试修改 package.json', async () => {
      const jsonPath = path.resolve(tempPath, 'package.json')
      await writeJson(jsonPath, {
        name: '@liuli-util/template',
      })
      await GenerateProgram.updatePackageJSON(tempPath)
      expect(
        ((await readJson(jsonPath)) as PackageJson).name?.endsWith('temp'),
      ).toBeTruthy()
    })
    it('测试修改 readme', async () => {
      const readmePath = path.resolve(tempPath, 'README.md')
      await writeFile(readmePath, `# @liuli-util/template`)
      await GenerateProgram.updateReadme(tempPath)
      console.log('readme: ', await readFile(readmePath, 'utf-8'))
      expect(
        (await readFile(readmePath, 'utf-8')).endsWith('temp'),
      ).toBeTruthy()
    })
  })
})
