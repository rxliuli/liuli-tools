import { watchEventListener } from './watchEventListener'

describe('测试事件监听', () => {
  it('简单示例', () => {
    watchEventListener()
    document.body.innerHTML = /* html */ `
    <main>
    <button id="btn"></button>
    </main>
    `
    const mockFn = jest.fn()
    const $btn: Element & {
      removeEventListenerByType: (type: string) => void
    } = document.querySelector('#btn') as any
    $btn.addEventListener('click', mockFn)
    // @ts-ignore
    $btn.click()
    expect(mockFn.mock.calls.length).toBe(1)
    $btn.removeEventListenerByType('click')
    // @ts-ignore
    $btn.click()
    expect(mockFn.mock.calls.length).toBe(1)
  })
})
