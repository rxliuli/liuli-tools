import { hello } from '../'
import { countTime, repeatedCall } from '@liuli-util/test'
import { hello as mixingThreadHello } from '../dist/cjs/mixingThread'

it('测试 worker', async () => {
  console.log(await hello('liuli'))
  const time = await countTime(() =>
    repeatedCall((i) => hello(i.toString()), 100),
  )
  console.log(time)
  expect(time).toBeLessThan(1_000)
})

it('测试在同一个文件编写主线程与 Worker 线程的代码', async () => {
  console.log(await mixingThreadHello('liuli'))
  const time = await countTime(() =>
    repeatedCall((i) => mixingThreadHello(i.toString()), 100),
  )
  console.log(time)
})
