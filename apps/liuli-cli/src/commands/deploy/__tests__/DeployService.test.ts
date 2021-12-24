import * as path from 'path'
import { mkdirp, remove, writeFile } from 'fs-extra'
import { DeployTypeEnum, GhPagesDeployService, SftpDeployOptions, SftpDeployService } from '../DeployService'

const tempPath = path.resolve(__dirname, '.temp')
beforeAll(async () => {
  const distPath = path.resolve(tempPath, 'dist')
  await remove(tempPath)
  await mkdirp(distPath)

  await writeFile(
    path.resolve(distPath, 'index.html'),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>测试部署</title>
  </head>
  <body>
    <h1>测试部署</h1>
  </body>
</html>
    `,
  )
})

describe('测试 SftpDeployService', () => {
  const options: SftpDeployOptions = {
    cwd: tempPath,
    dest: 'dist',
    remote: '/home/pinefield/apps/test',
    sshConfig: {
      host: '10.8.2.4',
      username: 'pinefield',
    },
  }
  it('基本示例', async () => {
    const sftpDeployService = new SftpDeployService(options)
    await sftpDeployService.deploy()
  })
  describe('测试校验', () => {
    it('正确情况', () => {
      const [isValid] = new SftpDeployService(options).validate()
      expect(isValid).toBeTruthy()
    })
    it('缺少字段', () => {
      const [isValid, errorText] = new SftpDeployService({
        cwd: tempPath,
      } as SftpDeployOptions).validate()
      expect(isValid).toBeFalsy()
      console.log(errorText)
    })
  })
})

describe('测试 GhPagesDeployService', () => {
  it('基本示例', async () => {
    const ghPagesDeployService = new GhPagesDeployService({
      cwd: tempPath,
      dest: 'dist',
      remote: 'examples/test-app',
    })
    await ghPagesDeployService.deploy().on('process', (title) => console.log(title))
  }, 10_000)
})
