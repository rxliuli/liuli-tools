import { ESBuildProgram } from '../ESBuildProgram'
import * as path from 'path'
import { mkdirp, pathExists, remove, writeJson } from 'fs-extra'
import { PackageJson } from 'type-fest'
import { build, Platform } from 'esbuild'
import { nativeNodeModules, nodeExternals } from '../util/esbuildPlugins'
import { findParent } from '../../../utils'

describe('测试 ESBuildProgram', () => {
  describe('测试 getPlatform', () => {
    const base: string = path.resolve(__dirname, '.temp/getPlatform')
    beforeEach(async () => {
      await remove(base)
      await mkdirp(base)
    })
    it('测试 node 类型', async () => {
      await writeJson(path.resolve(base, 'package.json'), {
        devDependencies: {
          '@types/node': '16',
        },
      } as PackageJson)
      expect(await ESBuildProgram.getPlatform(base)).toBe('node' as Platform)
    })
    it('测试浏览器类型', async () => {
      await writeJson(path.resolve(base, 'tsconfig.json'), {
        //注释
        compilerOptions: {
          lib: ['DOM'],
        },
      })
      expect(await ESBuildProgram.getPlatform(base)).toBe('browser' as Platform)
    })
    it('测试通用类型', async () => {
      expect(await ESBuildProgram.getPlatform(base)).toBe('neutral' as Platform)
    })
  })
  describe('测试 getDeps', () => {
    const base: string = path.resolve(__dirname, '.temp/getDeps')
    beforeEach(async () => {
      await remove(base)
      await mkdirp(base)
    })
    it('基本示例', async () => {
      await writeJson(path.resolve(base, 'package.json'), {
        devDependencies: {
          '@types/node': '16',
        },
        dependencies: {
          ora: '^6',
        },
        peerDependencies: {
          typescript: '^4',
        },
      } as PackageJson)
      const res = (await ESBuildProgram.getDeps(base)).sort()
      console.log(res)
      expect(res).toEqual(['@types/node', 'ora', 'typescript'].sort())
    })
  })
  describe('测试构建相关', () => {
    const base: string = path.resolve()
    const program = new ESBuildProgram({
      base,
      isWatch: false,
    })
    let deps: string[]
    let platform: Platform
    beforeEach(async () => {
      await remove(path.resolve(base, 'dist'))
      deps = await ESBuildProgram.getDeps(base)
      platform = await ESBuildProgram.getPlatform(base)
    })
    it('测试 genDTS', async () => {
      await program.genDTS()
      expect(await pathExists(path.resolve(base, 'dist/index.d.ts'))).toBeTruthy()
    })
    it('测试 getBuildCjsOption', async () => {
      await build(
        program.getBuildCjsOption({
          deps: deps,
          platform: platform,
        }),
      )
      expect(await pathExists(path.resolve(base, 'dist/index.js'))).toBeTruthy()
    })
    it('测试 getBuildESMOption', async () => {
      const option = program.getBuildESMOption({
        deps: deps,
        platform: platform,
      })
      console.log('option: ', deps, option)
      await build(option)
      expect(await pathExists(path.resolve(base, 'dist/index.esm.js'))).toBeTruthy()
    })
    it('测试 getBuildIifeOption', async () => {
      const option = program.getBuildIifeOption({
        platform: platform,
        globalName: 'test',
      })
      console.log('option: ', deps, option)
      await build({
        ...option,
        minify: false,
      })
      expect(await pathExists(path.resolve(base, 'dist/index.iife.js'))).toBeTruthy()
    })
    it('测试 getBuildCliOption', async () => {
      await build(
        program.getBuildCliOption({
          deps: deps,
          platform: platform,
        }),
      )
      expect(await pathExists(path.resolve(base, 'dist/bin.js'))).toBeTruthy()
    })
    it('测试 metafile', async () => {
      program.isWatch = true
      await program.build(
        program.getBuildCliOption({
          deps: deps,
          platform: platform,
        }),
      )
      expect(await pathExists(path.resolve(base, 'dist/bin.js'))).toBeTruthy()
    })
  })
})
it('测试 esbuild', async () => {
  await build({
    outfile: './dist/bin.js',
    format: 'cjs',
    sourcemap: true,
    entryPoints: ['./src/bin.ts'],
    bundle: true,
    external: [
      ...ESBuildProgram.globalExternal,
      // ...(await ESBuildProgram.getDeps(path.resolve())),
    ],
    platform: 'node',
    plugins: [nativeNodeModules(), nodeExternals()],
    treeShaking: true,
  })
})
describe('测试 cli 本身的构建', () => {
  let selfPath: string
  beforeAll(async () => {
    selfPath = (await findParent(__dirname, async (dir) => pathExists(path.join(dir, 'package.json'))))!
  })
  it('基本示例', async () => {
    const program = new ESBuildProgram({
      base: selfPath,
      isWatch: false,
    })
    const { cli, cjs, esm } = await program.getTasks()
    await program.execTasks([cli, cjs, esm])
  })
})
