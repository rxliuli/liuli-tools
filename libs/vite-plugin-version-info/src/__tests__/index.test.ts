import { expect, it, describe, beforeEach } from 'vitest'
import * as path from 'path'
import { mkdirp, readFile, remove, writeFile, writeJson } from '@liuli-util/fs-extra'
import { rewriteEnv, rewriteHTML } from '../index'
import * as envFile from 'envfile'
import { parse } from 'node-html-parser'

describe('测试 rewrite', () => {
  const tempPath = path.resolve(__dirname, '.temp')

  beforeEach(async () => {
    await remove(tempPath)
    await mkdirp(tempPath)

    await writeJson(path.resolve(tempPath, 'package.json'), {
      name: 'test',
      version: '1.0.0',
    })
  })

  describe('测试 rewriteEnv', () => {
    it('基本示例', async () => {
      await rewriteEnv(tempPath)

      expect(envFile.parse(await readFile(path.resolve(tempPath, '.env.local'), 'utf-8')).VITE_VERSION).toBe('1.0.0')
    })

    it('测试已存在 .env.local', async () => {
      await writeFile(path.resolve(tempPath, '.env.local'), 'VITE_NAME=test')
      await rewriteEnv(tempPath)
      const envs = envFile.parse(await readFile(path.resolve(tempPath, '.env.local'), 'utf-8'))
      expect(envs.VITE_VERSION).toBe('1.0.0')
      expect(envs.VITE_NAME).toBe('test')
    })
  })

  describe('测试 rewriteHTML', () => {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.ts"></script>
  </body>
</html>
`

    it('基本示例', async () => {
      expect(parse(rewriteHTML(html, '1.0.0')).querySelector('meta[name="version"]')).toBeTruthy()
    })
  })
})
