import { fileURLToPath } from 'url'
import { remove, mkdirp, writeFile, readFile } from '@liuli-util/fs-extra'
import path from 'path'
import { generate } from '../generate'
import { beforeEach, it } from 'vitest'
const tempPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.temp')

beforeEach(async () => {
  await remove(tempPath)
  await mkdirp(tempPath)
  await writeFile(path.resolve(tempPath, 'App.module.css'), `.hide { display: none; }`)
})

it('basic', async () => {
  const code = await readFile(path.resolve(tempPath, 'App.module.css'), 'utf-8')
  const r = generate(code, 'App.module.css', 'App.module.css.d.ts')
  console.log(r)
})
