import { mkdirp, readFile, remove, writeJson } from 'fs-extra'
import * as path from 'path'
import { parse } from 'json5'

it('测试 json5', async () => {
  const base = path.resolve(__dirname, './temp')
  await remove(base)
  await mkdirp(base)

  const tsconfigPath = path.resolve(base, 'tsconfig.json')
  await writeJson(tsconfigPath, {
    //注释
    compilerOptions: {
      lib: ['DOM'],
    },
  })
  const res = parse(await readFile(tsconfigPath, 'utf-8'))
  expect(res).not.toBeNull()
})
