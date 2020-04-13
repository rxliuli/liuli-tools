import { MicrotaskQueue } from './MicrotaskQueue'
import { wait } from '../async/wait'

describe('测试 MicrotaskQueue', () => {
  describe('基本示例', async () => {
    function Person(name: string) {
      const bit = new MicrotaskQueue()
      bit.add(() => console.log(`Hi! This is ${name}!`))
      return {
        sleep(num: number) {
          bit.add(async () => {
            await wait(num * 100)
            console.log(`Wake up after ${num}`)
          })
          return this
        },
        eat(name: string) {
          bit.add(() => console.log(`Eat ${name}~`))
          return this
        },
        sleepFirst(num: number) {
          bit.add(async () => {
            await wait(num * 100)
            console.log(`Wake up after ${num}`)
          }, 0)
          return this
        },
      }
    }

    it('测试 1', async () => {
      Person('Li')
      await wait(100)
    })
    it('测试 2', async () => {
      Person('Dan')
        .sleep(3)
        .eat('dinner')
      await wait(5000)
    }, 6000)
    it('测试 3', async () => {
      Person('Jerry')
        .eat('dinner')
        .eat('supper')
      await wait(100)
    })
    it('测试 4', async () => {
      Person('Smith')
        .sleepFirst(3)
        .eat('supper')
      await wait(5000)
    }, 6000)
  })
})
