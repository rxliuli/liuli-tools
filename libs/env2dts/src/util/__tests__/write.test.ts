import { insertCode } from '../write'
import { generate } from '../generate'

describe.skip('测试 insertCode', () => {
  it('基本示例', () => {
    const res = insertCode(
      `declare interface ViteEnv {
//region env2dts begin
//region env2dts end
}`,
      generate(['PORT', 'ENV']),
    )
    expect(res.includes('PORT?: string')).toBeTruthy()
    expect(res.includes('ENV?: string')).toBeTruthy()
  })
  it('测试已经手写了环境变量的情况', () => {
    const res = insertCode(
      `declare interface ViteEnv {
PORT: number
//region env2dts begin
//region env2dts end
}`,
      generate(['PORT', 'ENV']),
    )
    expect(res.includes('PORT?: string')).toBeFalsy()
    expect(res.includes('ENV?: string')).toBeTruthy()
  })
})
