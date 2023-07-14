import { describe, expect, it } from 'vitest'
import { initTempPath } from '@liuli-util/test'
import pathe from 'pathe'
import { readFile, writeFile } from 'fs/promises'
import { build } from 'vite'
import { node } from '..'
import { $ } from 'zx/core'
import { fs } from 'zx'
import { externals } from '../plugins/externals'
import { native } from '../plugins/native'

const tempPath = initTempPath(__filename, async () => {
  await writeFile(
    pathe.resolve(tempPath, 'package.json'),
    JSON.stringify({
      name: 'test',
      type: 'module',
    }),
  )
  await writeFile(
    pathe.resolve(tempPath, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ESNext',
        lib: ['ESNext'],
        outDir: './dist',
        skipLibCheck: true,
        esModuleInterop: true,
        strict: true,
        module: 'ESNext',
        moduleResolution: 'node',
        sourceMap: true,
        declaration: true,
        declarationMap: true,
      },
      typedocOptions: {
        entryPoints: ['src/index.ts'],
        out: 'docs',
        readme: 'README.md',
        gitRemote: 'origin',
      },
    }),
  )
})

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

it('fsevents', async () => {
  const entry = pathe.resolve(tempPath, 'index.ts')
  await writeFile(entry, `export * from 'fsevents'`)
  await expect(
    build({
      root: tempPath,
      plugins: [externals(), native()],
      build: {
        lib: {
          entry: entry,
          formats: ['cjs'],
        },
        minify: false,
      },
    }),
  ).rejects.toThrowError()
})

it('fileName', async () => {
  const entry1 = pathe.resolve(tempPath, 'index.ts')
  const entry2 = pathe.resolve(tempPath, 'bin.ts')
  await writeFile(pathe.resolve(tempPath, 'package.json'), JSON.stringify({ name: 'test', type: 'module' }))
  await writeFile(entry1, `export const add = (a: number, b: number) => a + b`)
  await writeFile(entry2, `console.log('hello world')`)
  await build({
    root: tempPath,
    plugins: [node({ entry: [entry1, entry2], formats: ['es', 'cjs'] })],
    build: { minify: false },
  })
  // await $`node ${pathe.resolve(tempPath, 'dist/index.js')}`
})

describe('dts', () => {
  it('dts generate', async () => {
    const entry = pathe.resolve(tempPath, 'index.ts')
    await writeFile(pathe.resolve(tempPath, 'add.ts'), `export const add = (a: number, b: number) => a + b`)
    await writeFile(entry, `export * from './add'`)
    await build({
      root: tempPath,
      plugins: [node({ entry: [entry], dts: true })],
      build: { minify: false },
    })
    expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/index.d.ts'))).true
    expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/add.d.ts'))).true
  })

  it('dts bundle', async () => {
    const entry = pathe.resolve(tempPath, 'index.ts')
    await Promise.all([
      writeFile(pathe.resolve(tempPath, 'add.ts'), `export const add = (a: number, b: number) => a + b`),
      writeFile(entry, `export * from './add'`),
    ])
    await build({
      root: tempPath,
      plugins: [node({ entry: [entry], dts: { bundle: true } })],
      build: { minify: false },
    })
    expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/index.d.ts'))).true
    expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/add.d.ts'))).false
  })

  it('multiple dts bundle', async () => {
    const entry1 = pathe.resolve(tempPath, 'entry1.ts')
    const entry2 = pathe.resolve(tempPath, 'entry2.ts')
    await writeFile(pathe.resolve(tempPath, 'add.ts'), `export const add = (a: number, b: number) => a + b`)
    await writeFile(entry1, `export * from './add'`)
    await writeFile(entry2, `export * from './add'`)
    await build({
      root: tempPath,
      plugins: [node({ entry: [entry1, entry2], dts: { bundle: true } })],
      build: { minify: false },
    })
    expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/entry1.d.ts'))).true
    expect(await fs.pathExists(pathe.resolve(tempPath, 'dist/entry2.d.ts'))).true
  })
})
