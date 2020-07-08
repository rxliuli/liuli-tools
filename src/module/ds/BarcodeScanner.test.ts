import { BarcodeScanner } from './BarcodeScanner'

describe('测试 BarcodeScanner', () => {
  it('基本示例', () => {
    let expectRes: string
    const barcodeScanner = new BarcodeScanner({
      validate(key) {
        return /^\w$/.test(key)
      },
    })
    barcodeScanner.on(code => {
      expect(code).toBe(expectRes)
    })
    const dispatch = (key: string) =>
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
        }),
      )
    dispatch('a')
    dispatch('b')
    dispatch('c')
    //触发回车终结
    expectRes = 'abc'
    dispatch('Enter')

    dispatch('1')
    dispatch('2')
    dispatch('3')
    //不受之前输入的影响，会重新计算
    expectRes = '123'
    dispatch('Enter')
  })
})
