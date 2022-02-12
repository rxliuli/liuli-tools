import { PathUtil } from '../PathUtil'

/**
 * @test {pathUtil}
 */
describe('test pathUtil', () => {
  it('simple example', () => {
    const url = '/api/user/login'
    expect(PathUtil.join('/api', '/user/login')).toBe(url)
    expect(PathUtil.join('/api/', '/user/login')).toBe(url)
    expect(PathUtil.join('/api', 'user/login')).toBe(url)
    expect(PathUtil.join('/api', 'user', 'login')).toBe(url)
    expect(PathUtil.join('/api/', '/user/', '/login')).toBe(url)
  })
})
