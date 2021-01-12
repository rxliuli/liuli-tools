import { copyText } from './copyText'

/**
 * @test {copyText}
 * But currently jsdom does not support the docuemnt.execCommand function.
 */
describe.skip('test copyText', () => {
  it('test simple copy text', () => {
    const result = copyText('test')
    expect(result).toBeTrue()
  })
  it('复制换行文本', function () {
    expect(
      copyText(
        JSON.stringify({
          name: 'rx',
          age: 11,
        }),
      ),
    ).toBeTrue()
  })
})
