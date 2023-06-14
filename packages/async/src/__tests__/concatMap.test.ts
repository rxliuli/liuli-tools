import { expect, it, describe } from 'vitest'
import { concatMap } from '../concatMap'
import { wait } from '../wait'

describe('test concatMap', () => {
  describe('simple example', () => {
    // 模拟一个异步请求，接受参数并返回它，然后等待指定的时间
    async function get(ms: number) {
      await wait(ms)
      return ms
    }

    it('no use concatMap', async () => {
      let result = 0

      await Promise.all([
        get(30).then((res) => (result = res)),
        get(20).then((res) => (result = res)),
        get(10).then((res) => (result = res)),
      ])

      expect(result).toBe(30)
    })

    it('used concatMap', async () => {
      const fn = concatMap(get)
      let last = 0
      let sum = 0

      await Promise.all([
        fn(30).then((res) => {
          last = res
          sum += res
        }),
        fn(20).then((res) => {
          last = res
          sum += res
        }),
        fn(10).then((res) => {
          last = res
          sum += res
        }),
      ])

      expect(last).toBe(10)

      // 实际上确实执行了 3 次，结果也确实为 3 次调用参数之和
      expect(sum).toBe(60)
    }, 100000)
  })
})
