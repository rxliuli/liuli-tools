import { appendScript } from '../appendScript'

describe('测试 appendScript', () => {
  const newScript = 'liuli-cli sync'
  it('脚本不存在', () => {
    expect(appendScript(undefined, newScript)).toBe(newScript)
  })
  it('脚本存在但不包含新的脚本', () => {
    expect(appendScript('tsc', newScript)).toBe('tsc && ' + newScript)
  })
  it('脚本存在且包含新的脚本', () => {
    const oldScript = `${newScript} && tsc`
    expect(appendScript(oldScript, newScript)).toBe(oldScript)
  })
})
