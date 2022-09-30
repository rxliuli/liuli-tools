import { fileURLToPath } from 'url'
import { expect, it, describe, vi } from 'vitest'
import { Watcher } from '../Watcher'
import path from 'path'
import { wait } from '@liuli-util/async'

describe.skip('测试 Watcher', () => {
  const watcher = new Watcher()

  it('基本示例', async () => {
    await new Promise((resolve, reject) => {
      watcher
        .watchDirs([path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'i18n')], async (dir) => {
          console.log('watch: ', dir, Date.now())
        })
        .on('error', reject)
    })
  }, 1_000_000)

  it('监视两个目录', async () => {
    await new Promise<void>(async (resolve) => {
      const callback = vi.fn(async (dir: string) => {
        await wait(100)
        console.log(dir)
      })

      const dirs = [
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'temp/i18n1'),
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'temp/i18n2'),
      ]

      const fsWatcher = watcher.watchDirs(dirs, callback)
      await new Promise((resolve) => fsWatcher.on('ready', resolve))
      await wait(200)
      expect(callback.mock.calls.length).toBe(2)
      fsWatcher.unwatch(dirs)
      resolve()
    })
  }, 1_000_000)
})
