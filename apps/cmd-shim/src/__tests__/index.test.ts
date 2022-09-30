import { fileURLToPath } from 'url'
import { expect, it, describe } from 'vitest'
import { BinConfig, linkGlobalBin, readBinList } from '../index'
import * as path from 'path'
import { execPromise } from '../utils/execPromise'
import { pathExists } from '@liuli-util/fs-extra'

describe('测试 readBinList', () => {
  it('没有 bin', () => {
    const res = readBinList(path.dirname(fileURLToPath(import.meta.url)), {})
    expect(res.length).toBe(0)
  })

  describe('只有一条', () => {
    it('包含组织名', () => {
      const res = readBinList(path.dirname(fileURLToPath(import.meta.url)), {
        name: '@liuli-util/cli',
        bin: './dist/bin.js',
      })

      expect(res[0]).toEqual({
        name: 'cli',
        path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './dist/bin.js'),
      } as BinConfig)
    })

    it('不包含组织名', () => {
      const res = readBinList(path.dirname(fileURLToPath(import.meta.url)), {
        name: 'liuli-cli',
        bin: './dist/bin.js',
      })

      expect(res[0]).toEqual({
        name: 'liuli-cli',
        path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './dist/bin.js'),
      } as BinConfig)
    })

    it('包含多条', () => {
      const res = readBinList(path.dirname(fileURLToPath(import.meta.url)), {
        name: 'liuli-cli',

        bin: {
          'liuli-cli': './dist/bin.js',
          li: './dist/bin.js',
        },
      })

      expect(res).toEqual([
        {
          name: 'liuli-cli',
          path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './dist/bin.js'),
        },
        {
          name: 'li',
          path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './dist/bin.js'),
        },
      ] as BinConfig[])
    })
  })
})

it('测试 linkGlobalBin', async () => {
  const globalBinPath = ((await execPromise('npm -g bin')) as string).trimEnd()

  await linkGlobalBin(globalBinPath, {
    name: 'cmd-shim',
    path: path.resolve('dist/bin.js'),
  })

  expect(await pathExists(path.resolve(globalBinPath, 'cmd-shim'))).toBeTruthy()
})
