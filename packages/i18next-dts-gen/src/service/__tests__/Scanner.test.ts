import { fileURLToPath } from 'url'
import { expect, it } from 'vitest'
import { Scanner } from '../Scanner'
import path from 'path'

it('测试 scanner', async () => {
  const scanner = new Scanner()
  const list = await scanner.scan(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'i18n'))
  console.log(list)
})
