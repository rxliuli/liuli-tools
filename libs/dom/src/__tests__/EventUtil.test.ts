import { expect, it, describe, beforeEach, vi } from 'vitest'
import { EventUtil } from '../EventUtil'
import { wait } from '@liuli-util/async'
import { repeatedCall } from '@liuli-util/test'

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
    const mockFn = vi.fn()
    EventUtil.add($btn, 'click', mockFn)
    const num = 3
    repeatedCall(() => $btn.click(), num)
    await wait(100)
    expect(mockFn.mock.calls.length).toBe(num)
    EventUtil.remove($btn, 'click', mockFn)
    repeatedCall(() => $btn.click(), num)
    await wait(100)
    expect(mockFn.mock.calls.length).toBe(num)
  })

  it('测试 removeByType 移除匿名函数', async () => {
    const $btn = document.querySelector('.event-util > #btn') as HTMLButtonElement
    const mockFn1 = vi.fn()
    const mockFn2 = vi.fn()
    EventUtil.add($btn, 'click', mockFn1)
    EventUtil.add($btn, 'click', mockFn2)
    await wait(100)
    const num = 3
    repeatedCall(() => $btn.click(), num)

    //两个回调函数都执行了
    expect(mockFn1.mock.calls.length).toBe(num)

    expect(mockFn2.mock.calls.length).toBe(num)
    const removeListenerList = EventUtil.removeByType($btn, 'click')
    expect(removeListenerList.length).toBe(2)
    repeatedCall(() => $btn.click(), num)
    await wait(100)

    //删除之后两个回调函数都不会再执行
    expect(mockFn1.mock.calls.length).toBe(num)

    expect(mockFn2.mock.calls.length).toBe(num)

    //我们可以稍后将之再添加回来
    removeListenerList.forEach(({ listener, options }) => EventUtil.add($btn, 'click', listener as any, options))

    repeatedCall(() => $btn.click(), num)
    await wait(100)
    expect(mockFn1.mock.calls.length).toBe(num * 2)
    expect(mockFn2.mock.calls.length).toBe(num * 2)
  })
})
