import { build, BuildOptions } from 'esbuild'
import { remove, mkdirp, writeFile } from 'fs-extra'
import * as path from 'path'
import { env, raw } from '@liuli-util/esbuild-plugins/src'

describe('测试 esbuildPlugins', () => {
  const tempPath = path.resolve(__dirname, '.temp')
  beforeEach(async () => {
    await remove(tempPath)
    await mkdirp(tempPath)
  })
  const options: BuildOptions = {
    entryPoints: [path.resolve(tempPath)],
    bundle: true,
    outfile: path.resolve(tempPath, 'bundle.js'),
    format: 'esm',
    write: false,
  }
  describe('测试 raw', () => {
    beforeEach(async () => {
      await writeFile(path.resolve(tempPath, 'readme.md'), `test`)
      await writeFile(
        path.resolve(tempPath, 'index.js'),
        `
    import readme from './readme.md?raw'
    console.log(readme)
    `,
      )
    })
    it('基本示例', async () => {
      const res = await build({ ...options, plugins: [raw()] as any })
      expect(res.outputFiles![0].text.includes(JSON.stringify('test'))).toBeTruthy()
    })
    it('测试不使用插件', async () => {
      await expect(build(options)).rejects.toThrowError()
    })
  })

  describe('测试 env', () => {
    beforeEach(async () => {
      await writeFile(path.resolve(tempPath, 'index.js'), `console.log(import.meta.env.NODE_ENV)`)
    })
    it('基本示例', async () => {
      const res = await build({ ...options, plugins: [env({ import: true })] as any })
      expect(res.outputFiles![0].text.includes('"test"')).toBeTruthy()
    })
    it('测试不使用插件', async () => {
      const res = await build({ ...options })
      expect(res.outputFiles![0].text.includes('"test"')).toBeFalsy()
    })
  })
})
