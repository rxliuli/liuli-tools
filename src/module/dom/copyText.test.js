import { copyText } from './copyText'

/**
 * @test {copyText}
 */
describe.skip('test copyText(But currently jsdom does not support the docuemnt.execCommand function.)', () => {
  it('test simple copy text', () => {
    const result = copyText('test')
    expect(result).toBeTrue()
  })
})
