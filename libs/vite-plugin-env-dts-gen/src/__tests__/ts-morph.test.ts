import * as path from 'path'
import { mkdirp, remove, writeFile } from 'fs-extra'
import { Project } from 'ts-morph'
import { format } from 'prettier'

describe('测试 ts-morph', () => {
  const tempPath = path.resolve(__dirname, '.temp/ts-morph')
  beforeEach(async () => {
    await remove(tempPath)
    await mkdirp(tempPath)
  })
  it('基本示例', async () => {
    const dtsPath = path.resolve(tempPath, 'vite-env.d.ts')
    await writeFile(dtsPath, '')
    const project = new Project()
    const sourceFile = project.addSourceFileAtPath(dtsPath)
    console.log(sourceFile.getInterface('ImportMetaEnv'))
    sourceFile.addInterface({
      name: 'ImportMetaEnv',
      properties: [
        {
          name: 'VITE_BASE_URL',
          type: 'string',
          isReadonly: true,
        },
      ],
    })
    await sourceFile.save()
  })
  it('测试已经存在现有环境变量的情况', async () => {
    const dtsPath = path.resolve(tempPath, 'vite-env.d.ts')
    await writeFile(
      dtsPath,
      `interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}`,
    )
    const project = new Project()
    const sourceFile = project.addSourceFileAtPath(dtsPath)
    const res = sourceFile.getInterface('ImportMetaEnv')!
    console.log(res)
    res.addProperties([
      {
        name: 'VITE_SERVER_URL',
        type: 'string',
        isReadonly: true,
      },
    ])
    await writeFile(dtsPath, format(sourceFile.getText(), { parser: 'typescript' }))
  })
})
