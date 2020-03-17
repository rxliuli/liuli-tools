import { EventEmitter } from './EventEmitter'

describe('测试 EventEmitter', () => {
  it('基本示例', () => {
    const em = new EventEmitter()
    enum EventTypeEnum {
      Hello,
    }

    const fn = jest.fn(name => console.log('hello ', name))
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
})
