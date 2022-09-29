import { expect, it } from 'vitest'
import Spinnies from 'spinnies'

it('测试 spinnies', async () => {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  const spinnies = new Spinnies()

  spinnies.add('a', {
    text: '开始任务 a',
  })

  spinnies.add('b', {
    text: '开始任务 b',
  })

  await wait(3000)

  spinnies.succeed('a', {
    text: '成功运行任务 a',
  })

  spinnies.fail('b', {
    text: '成功运行任务 b',
  })
})
