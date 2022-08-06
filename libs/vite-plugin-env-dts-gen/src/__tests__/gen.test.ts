import path from 'path'
import { mkdirp, readFile, remove, writeFile } from 'fs-extra'
import { eq, gen, getEnvs } from '../gen'
import { CodeUtil } from '../utils/CodeUtil'

const tempPath = path.resolve(__dirname, '.temp/gen')
beforeEach(async () => {
  await remove(tempPath)
  await mkdirp(tempPath)
})
it('基本示例', async () => {
  await writeFile(path.resolve(tempPath, '.env'), 'PORT=3000\n')
  await writeFile(path.resolve(tempPath, '.env.development'), 'PORT=3000\nENV=dev\nBASE_URL=http://localhost:3000')
  await writeFile(path.resolve(tempPath, '.env.production'), 'PORT=3000\nENV=prod\n')
  const dtsPath = path.resolve(tempPath, 'src/vite-env.d.ts')
  await mkdirp(path.dirname(dtsPath))
  await writeFile(dtsPath, '')
  await gen(tempPath)
  const ast = CodeUtil.parse(await readFile(dtsPath, 'utf-8'))
  expect(getEnvs(ast)).toEqual(['PORT', 'ENV', 'BASE_URL'])
})
it('测试找不到环境变量文件', async () => {
  await expect(gen(tempPath)).rejects.toThrowError()
})
it('测试已经包含其他代码', async () => {
  const dtsPath = path.resolve(tempPath, 'src/vite-env.d.ts')
  await mkdirp(path.dirname(dtsPath))
  await writeFile(dtsPath, '/// <reference types="vite/client" />')
  await gen(tempPath)
  expect((await readFile(dtsPath, 'utf-8')).startsWith('/// <reference types="vite/client" />')).toBeTruthy()
})
it('测试已经包含了指定名称的环境变量', async () => {
  const dtsPath = path.resolve(tempPath, 'src/vite-env.d.ts')
  await mkdirp(path.dirname(dtsPath))
  await writeFile(
    dtsPath,
    `interface ImportMetaEnv {
  readonly PORT: string;
}`,
  )
  const ast = CodeUtil.parse(await readFile(dtsPath, 'utf-8'))
  expect(getEnvs(ast)).toEqual(['PORT'])
})

it('eq', () => {
  expect(eq(['a', 'b'], ['b', 'a'])).toBeTruthy()
})
