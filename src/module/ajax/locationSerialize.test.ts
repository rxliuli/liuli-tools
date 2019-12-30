import { locationSerialize, queryUrlInit } from './locationSerialize'

describe('测试 locationSerialize', () => {
  it('基本示例', function() {
    const serializeParam = {
      name: 'liuli',
      age: 17,
    }

    window.location.href = `https://rxliuli.com/?serializeParam=${encodeURIComponent(
      JSON.stringify(serializeParam),
    )}`
    //测试自动初始化
    const user = queryUrlInit({})
    expect(user).toEqual(serializeParam)
    //测试自动序列化
    const name = '琉璃'
    user.name = name
    expect(
      JSON.parse(
        decodeURIComponent(
          new URL(location.href).searchParams.get(locationSerialize.ParamName)!,
        ),
      ).name,
    ).toBe(name)
  })
})
