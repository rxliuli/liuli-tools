import { EventUtil } from './EventUtil'
import { wait } from '../async/wait'
import { repeatedCall } from '../function/repeatedCall'

describe('测试 EventUtil', () => {
  let $btn: HTMLButtonElement
  beforeEach(() => {
    document.body.innerHTML = /* html */ `
    <main class="event-util">
        <button id="btn">按钮</button>
    </main>
    `
    $btn = document.querySelector('.event-util > #btn') as HTMLButtonElement
  })
  it('基本示例', async () => {
    const mockFn = jest.fn()
    EventUtil.add($btn as any, 'click', mockFn)
    const num = 3
    repeatedCall(num, () => $btn.click())
    await wait(100)
    expect(mockFn.mock.calls.length).toBe(num)

    EventUtil.remove($btn as any, 'click', mockFn)
    repeatedCall(num, () => $btn.click())
    await wait(100)
    expect(mockFn.mock.calls.length).toBe(num)
  })
  it('测试 removeByType 移除匿名函数', async () => {
    const $btn = document.querySelector(
      '.event-util > #btn',
    ) as HTMLButtonElement
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    EventUtil.add($btn as any, 'click', mockFn1)
    EventUtil.add($btn as any, 'click', mockFn2)
    await wait(100)
    const num = 3
    repeatedCall(num, () => $btn.click())
    //两个回调函数都执行了
    expect(mockFn1.mock.calls.length).toBe(num)
    expect(mockFn2.mock.calls.length).toBe(num)

    EventUtil.removeByType($btn as any, 'click')
    repeatedCall(num, () => $btn.click())
    await wait(100)
    //删除之后两个回调函数都不会再执行
    expect(mockFn1.mock.calls.length).toBe(num)
    expect(mockFn2.mock.calls.length).toBe(num)
  })
})
