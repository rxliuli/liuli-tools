import { fileURLToPath } from 'url'
import { expect, it } from 'vitest'
import { GeneratorCommandProgram } from '../GeneratorCommand'
import path from 'path'
import { pathExists, remove } from '@liuli-util/fs-extra'

it('测试 GeneratorCommand', async () => {
  const command = new GeneratorCommandProgram()
  const dtsPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'i18n/index.d.ts')
  await remove(dtsPath)

  await command.main({
    dirs: [path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'i18n')],
    watch: false,
    language: 'zh',
  })

  expect(await pathExists(dtsPath)).toBeTruthy()
})
