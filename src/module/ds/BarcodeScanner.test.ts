import { BarcodeScanner } from './BarcodeScanner'
import { wait } from '../async/wait'

describe('测试 BarcodeScanner', () => {
  const barcodeScanner = new BarcodeScanner({
    validate(key) {
      return /^\w$/.test(key)
    },
  })
  const dispatch = (key: string) =>
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key,
      }),
    )

  it('基本示例', () => {
    const listener = jest.fn((code: string) => {
      console.log('code: ', code)
    })
    barcodeScanner.on(listener)
    dispatch('a')
    dispatch('b')
    dispatch('c')
    //触发回车终结
    dispatch('Enter')
    expect(listener.mock.calls[0]).toEqual(['abc'])

    dispatch('1')
    dispatch('2')
    dispatch('3')
    //不受之前输入的影响，会重新计算
    dispatch('Enter')
    expect(listener.mock.calls[1]).toEqual(['123'])
    barcodeScanner.off(listener)
  })
  it('测试多个监听', () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    barcodeScanner.on(fn1)
    barcodeScanner.on(fn2)
    dispatch('Enter')
    expect(fn1.mock.calls.length).toBe(1)
    expect(fn2.mock.calls.length).toBe(1)
    barcodeScanner.off(fn1)
    dispatch('Enter')
    expect(fn1.mock.calls.length).toBe(1)
    expect(fn2.mock.calls.length).toBe(2)
  })
  it('测试手动回车不会触发任何东西', async () => {
    const listener = jest.fn()
    barcodeScanner.on(listener)
    dispatch('a')
    dispatch('b')
    dispatch('c')
    //等待 100ms  回车
    await wait(100)
    dispatch('Enter')
    //将不会触发监听函数
    expect(listener.mock.calls.length).toBe(0)
  })
})
