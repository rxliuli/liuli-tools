import Conf from 'conf'
import { wait } from '../util/wait'
import { writeJson } from '@liuli-util/fs-extra'

describe('测试 conf', () => {
  const conf = new Conf<{
    lock: boolean
  }>({
    projectName: '@liuli-util/test',
  })

  beforeEach(() => {
    conf.clear()
  })

  it('测试并发模式', async () => {
    await Promise.all([
      wait(() => conf.store.lock),
      wait(1000).then(() => {
        conf.set('lock', true)
      }),
    ])

    expect(conf.store.lock).toBeTruthy()
  })

  it('测试直接修改文件', async () => {
    await Promise.all([
      wait(() => conf.store.lock),
      wait(1000).then(async () => {
        await writeJson(conf.path, {
          lock: true,
        })
      }),
    ])

    expect(conf.store.lock).toBeTruthy()
  })
})
