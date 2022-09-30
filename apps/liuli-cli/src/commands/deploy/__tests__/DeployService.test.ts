import { fileURLToPath } from 'url'
import { expect, it, beforeAll, describe, beforeEach, vi } from 'vitest'
import * as path from 'path'
import { mkdirp, remove, writeFile } from '@liuli-util/fs-extra'

import { GhPagesDeployOptions, GhPagesDeployService, SftpDeployOptions, SftpDeployService } from '../DeployService'

import { nodeCacheDir } from '../../../utils/nodeCacheDir'
const tempPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.temp')

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

describe.skip('测试 SftpDeployService', () => {
  const options: SftpDeployOptions = {
    debug: false,
    cwd: tempPath,
    dist: 'dist',
    dest: process.env.dest!,

    sshConfig: {
      host: process.env.host,
      username: process.env.username,
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
  const options: GhPagesDeployOptions = {
    debug: false,
    cwd: tempPath,
    dist: 'dist',
    dest: '/',
    repo: 'https://github.com/rxliuli/test-git.git',
    remote: 'origin',
    branch: 'gh-pages',
  }

  const ghPagesDeployService = new GhPagesDeployService(options)
  const distPath = path.resolve(tempPath, 'dist')
  const mock = vi.fn().mockImplementation((title) => console.log(title))

  beforeEach(async () => {
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
    <p>${Date.now()}</p>
  </body>
</html>
    `,
    )

    mock.mockClear()
  })

  it.skip('基本示例', async () => {
    await ghPagesDeployService.deploy().on('process', mock)
    console.log(mock.mock.calls)
    expect(mock.mock.calls.some((item: string[]) => item.includes('完成推送'))).toBeTruthy()
  }, 10_000)

  it.skip('测试推送到子目录', async () => {
    const ghPagesDeployService = new GhPagesDeployService({
      ...options,
      dest: '/test',
    })

    await ghPagesDeployService.deploy().on('process', mock)
    console.log(mock.mock.calls)
    expect(mock.mock.calls.some((item: string[]) => item.includes('完成推送'))).toBeTruthy()
  }, 10_000)

  it('测试增量推送', async () => {
    const ghPagesDeployService = new GhPagesDeployService({
      ...options,
      dist: './',
      add: true,
    })

    await ghPagesDeployService.deploy().on('process', mock)
    console.log(mock.mock.calls)
    expect(mock.mock.calls.some((item: string[]) => item.includes('完成推送'))).toBeTruthy()
  }, 10_000)

  it.skip('测试没有任何修改', async () => {
    await writeFile(path.resolve(distPath, 'index.html'), 'test')
    await ghPagesDeployService.deploy().on('process', mock)
    await ghPagesDeployService.deploy().on('process', mock)
    expect(mock.mock.calls.some((item: string[]) => item.includes('没有任何提交，跳过提交'))).toBeTruthy()
    expect(mock.mock.calls.some((item: string[]) => item.includes('没有更新，跳过推送'))).toBeTruthy()
  }, 20_000)

  it.skip('测试首次拉取代码', async () => {
    const dir = path.resolve(nodeCacheDir('liuli-cli'), 'gh-pages', options.repo!.replace(new RegExp('[/:]', 'g'), '_'))

    await remove(dir)
    await ghPagesDeployService.deploy().on('process', mock)
    expect(mock.mock.calls.some((item: string[]) => item.includes('克隆项目'))).toBeTruthy()
  }, 10_000)
})
