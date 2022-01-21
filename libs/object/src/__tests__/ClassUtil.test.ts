import { ClassUtil } from '../ClassUtil'

describe('测试 ClassUtil', () => {
  it('测试 scan', () => {
    class HelloApi {
      list = () => {}

      hello() {}
    }

    expect(ClassUtil.scan(new HelloApi())).toEqual(['hello'])
  })
})
