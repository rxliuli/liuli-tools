import { EventEmitter } from './EventEmitter'

describe('测试 EventEmitter', () => {
  enum EventTypeEnum {
    Hello,
    CorrectType,
  }
  const em = new EventEmitter<{
    [EventTypeEnum.Hello]: [string]
    [EventTypeEnum.CorrectType]: [number, string]
  }>()
  it('基本示例', () => {
    const fn = jest.fn((name) => console.log('hello ', name))
    em.add(EventTypeEnum.Hello, fn)
      .add(EventTypeEnum.Hello, fn)
      .add(EventTypeEnum.Hello, fn)

    em.emit(EventTypeEnum.Hello, 'liuli')
    expect(fn.mock.calls.length).toBe(3)

    expect(em.listeners(EventTypeEnum.Hello).length).toBe(3)
    em.removeByType(EventTypeEnum.Hello)
    expect(em.listeners(EventTypeEnum.Hello).length).toBe(0)

    em.emit(EventTypeEnum.Hello, 'liuli')
    expect(fn.mock.calls.length).toBe(3)
  })
  it('使用正确的类型', () => {
    const args = [1, '2'] as const
    em.add(EventTypeEnum.CorrectType, (i, s) => {
      expect(i + Number.parseInt(s)).toBe(3)
    })
    em.emit(EventTypeEnum.CorrectType, ...args)
  })
})
