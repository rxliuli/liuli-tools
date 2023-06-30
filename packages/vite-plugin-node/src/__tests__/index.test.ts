import { expect, it } from 'vitest'
import { initTempPath } from '@liuli-util/test'
import pathe from 'pathe'
import { readFile, writeFile } from 'fs/promises'
import { build } from 'vite'
import { node } from '..'
import { $ } from 'zx/core'

const tempPath = initTempPath(__filename)

it('basic', async () => {
  const entry = pathe.resolve(tempPath, 'index.ts')
  await writeFile(entry, `export const add = (a: number, b: number) => a + b`)
  await build({
    root: tempPath,
    plugins: [node({ entry: [entry] })],
    build: { minify: false },
  })
  await $`node ${pathe.resolve(tempPath, 'dist/index.js')}`
})

it('zx', async () => {
  const entry = pathe.resolve(tempPath, 'index.ts')
  await writeFile(
    entry,
    `
    import { chalk } from 'zx'
    console.log(chalk('hello'))
  `,
  )
  await build({
    root: tempPath,
    plugins: [node({ entry: [entry] })],
    build: { minify: false },
  })
  await $`node ${pathe.resolve(tempPath, 'dist/index.js')}`
})

it('tree-shaking', async () => {
  const entry = pathe.resolve(tempPath, 'index.ts')
  await writeFile(entry, `export { isNull } from 'lodash-es'`)
  await build({
    root: tempPath,
    plugins: [node({ entry: [entry] })],
    build: { minify: false },
  })
  await $`node ${pathe.resolve(tempPath, 'dist/index.js')}`
  const r = await readFile(pathe.resolve(tempPath, 'dist/index.js'), 'utf-8')
  expect(r).not.include('lodash-es')
  expect(r).include('isNull')
})
