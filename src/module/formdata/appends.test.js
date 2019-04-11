import { appends } from './appends'

/**
 * @test {appends}
 */
describe('test appends', () => {
  it('simple example', () => {
    const fd = new FormData()
    appends(fd, {
      name: 'rx',
      age: 17
    })
    expect(fd.get('name')).toBe('rx')
    expect(fd.get('age')).toBe('17')
  })
})
