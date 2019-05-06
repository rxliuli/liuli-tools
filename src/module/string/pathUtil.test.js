import { pathUtil } from '../../index'

/**
 * @test {pathUtil}
 */
describe('test pathUtil', () => {
  it('simple example', () => {
    const url = '/api/user/login'
    expect(pathUtil.join('/api', '/user/login')).toBe(url)
    expect(pathUtil.join('/api/', '/user/login')).toBe(url)
    expect(pathUtil.join('/api', 'user/login')).toBe(url)
    expect(pathUtil.join('/api', 'user', 'login')).toBe(url)
    expect(pathUtil.join('/api/', '/user/', '/login/')).toBe(url)
  })
})
