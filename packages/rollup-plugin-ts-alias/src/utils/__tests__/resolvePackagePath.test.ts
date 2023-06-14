import { expect, it } from 'vitest'
import { resolvePackagePath } from '../resolvePackagePath'

it.only('resolvePackagePath', () => {
  const r = resolvePackagePath('@liuli-util/async/package.json')
  expect(r.endsWith('libs/async/package.json')).toBeTruthy()
})

it('resolveSubpath', () => {
  const r = resolvePackagePath('@liuli-util/async/src')
  expect(r.endsWith('/libs/async/src/index.ts')).toBeTruthy()
})
