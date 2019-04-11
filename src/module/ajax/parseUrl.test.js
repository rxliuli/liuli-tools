import { parseUrl } from './parseUrl'

/**
 * @test {parseUrl}
 */
describe('test parseUrl', () => {
  it('test simple example', () => {
    const rxUrl = parseUrl('http://blog.rxliuli.com/p/?id=1&commentId=2')
    expect(rxUrl).toEqual({
      href: '/p/?id=1&commentId=2',
      website: 'http://blog.rxliuli.com',
      protocol: 'http',
      domain: 'blog.rxliuli.com',
      accessPath: '/p',
      params: {
        id: '1',
        commentId: '2'
      },
      url: 'http://blog.rxliuli.com/p/?id=1&commentId=2',
      port: 80
    })
  })
})
