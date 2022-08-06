import path from 'path'
import { mkdirp, readFile, remove, writeFile } from 'fs-extra'
import { gen } from '../gen'
import { Project } from 'ts-morph'

describe('测试 gen', () => {
  const tempPath = path.resolve(__dirname, '.temp/gen')
  beforeEach(async () => {
    await remove(tempPath)
    await mkdirp(tempPath)
  })
  it('基本示例', async () => {
    // language=DotEnv
    await writeFile(path.resolve(tempPath, '.env'), 'PORT=3000\n')
    // language=DotEnv
    await writeFile(path.resolve(tempPath, '.env.development'), 'PORT=3000\nENV=dev\nBASE_URL=http://localhost:3000')
    // language=DotEnv
    await writeFile(path.resolve(tempPath, '.env.production'), 'PORT=3000\nENV=prod\n')
    const dtsPath = path.resolve(tempPath, 'src/vite-env.d.ts')
    await mkdirp(path.dirname(dtsPath))
    await writeFile(dtsPath, '')
    await gen(tempPath)
    const project = new Project()
    const res = project.addSourceFileAtPath(dtsPath).getInterface('ImportMetaEnv')!
    expect(res.getProperty('PORT')).not.toBeUndefined()
    expect(res.getProperty('BASE_URL')).not.toBeUndefined()
    expect(res.getProperty('ENV')).not.toBeUndefined()
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
    await writeFile(path.resolve(tempPath, '.env'), 'PORT=3000\n')
    await gen(tempPath)
    const project = new Project()
    const res = project.addSourceFileAtPath(dtsPath).getInterface('ImportMetaEnv')!
    expect(res.getProperties().length).toBe(1)
  })
})
