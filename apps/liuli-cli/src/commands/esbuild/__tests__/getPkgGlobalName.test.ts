import { expect, it, describe } from 'vitest'
import { getPkgGlobalName } from '../util/getPkgGlobalName'

describe('测试 getPkgGlobalName', () => {
  it('基本示例', () => {
    expect(getPkgGlobalName('@babel/preset-env')).toBe('PresetEnv')
  })

  it('不包含组织名', () => {
    expect(getPkgGlobalName('babel')).toBe('Babel')
    expect(getPkgGlobalName('preset-env')).toBe('PresetEnv')
  })
})
