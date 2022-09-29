import { expect, it, describe, beforeEach } from 'vitest'
import { mkdir, readJson, remove, writeJson } from '@liuli-util/fs-extra'
import path from 'path'
import { SyncConfigType, SyncProgram } from '../SyncProgram'
import { merge } from 'lodash-es'
import { PackageJson } from 'type-fest'

describe('测试 SyncProgram', () => {
  const tempPath = path.resolve(__dirname, '.temp')
  const syncProgram = new SyncProgram(tempPath)

  beforeEach(async () => {
    await remove(tempPath)
    await mkdir(tempPath)
  })

  it('测试 sync', async () => {
    const workspaces = ['packages/common/*', 'apps/*']
    await writeJson(path.resolve(tempPath, 'lerna.json'), {})

    await writeJson(path.resolve(tempPath, 'package.json'), {
      name: 'temp',
      license: 'mit',
      private: true,

      sync: [
        'prettier',
        'commitlint',
        'workspaces',
        'gitignore',
        'simplehooks',
        'eslint-ts',
        'jest',
      ] as SyncConfigType[],

      workspaces,
    } as PackageJson)

    await syncProgram.sync()
  })

  it.skip('测试初始化同步配置', async () => {
    await writeJson(path.resolve(tempPath, 'lerna.json'), {})
    const file = path.resolve(tempPath, 'package.json')

    await writeJson(file, {
      name: 'temp',
      private: true,
    } as PackageJson)

    await syncProgram.init()
    expect(((await readJson(file)).sync as string[]).length).toBeGreaterThan(0)
  }, 100_000)

  it('测试同步 jest', async () => {
    const jsonPath = path.resolve(tempPath, 'package.json')

    await writeJson(jsonPath, {
      name: 'temp',
      sync: ['jest'] as SyncConfigType[],
    } as PackageJson)

    await syncProgram.sync()
    const json = (await readJson(jsonPath)) as PackageJson
    const devDeps = Object.keys(json.devDependencies!)
    expect(devDeps.includes('jest') && devDeps.includes('ts-jest')).toBeTruthy()
  })
})

it('测试 lodash-es.merge', () => {
  const res = merge(
    {
      arr: ['a'],
    },
    {
      arr: ['b'],
    },
  )

  expect(res).toEqual({
    arr: ['b'],
  })
})
