import { MicrotaskQueue } from './MicrotaskQueue'
import { wait } from './wait'

describe('测试 MicrotaskQueue', () => {
  function Person(name: string) {
    const bit = new MicrotaskQueue()
    bit.add(() => console.log(`Hi! This is ${name}!`))
    return {
      sleep(num: number) {
        bit.add(async () => {
          await wait(num * 1000)
          console.log(`Wake up after ${num}`)
        })
        return this
      },
      eat(name: string) {
        bit.add(() => console.log(`Eat ${name}~`))
        return this
      },
      sleepFirst(num: number) {
        bit.tasks.unshift(async () => {
          console.log(`Wake up after ${num}`)
          await wait(num * 1000)
        })
        bit.execute()
        return this
      },
      cancel() {
        bit.tasks.pop()
        bit.execute()
        return this
      },
    }
  }

  it('不添加任何动作', async () => {
    Person('Li')
    await wait(100)
  })
  it('测试链式调用 eat', async () => {
    Person('Jerry')
      .eat('dinner')
      .eat('supper')
    await wait(100)
  })
  it('测试 sleep 等待', async () => {
    Person('Dan')
      .sleep(3)
      .eat('dinner')
    await wait(4000)
  })
  it('测试 sleepFirst 在首次等待', async () => {
    Person('Smith')
      .sleepFirst(3)
      .eat('supper')
    await wait(4000)
  })
  it('测试 cancel 取消操作', async () => {
    Person('Smith')
      .eat('supper')
      .sleepFirst(3)
      .cancel()
    await wait(4000)
  })
})
