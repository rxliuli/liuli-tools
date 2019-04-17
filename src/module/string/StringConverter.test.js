import { StringStyleUtil, stringStyleType } from './StringConverter'

/**
 * @test {StringConverter}
 */
describe('test StringConverter', () => {
  it('simple example', () => {
    // 直接进行转换
    expect(
      StringStyleUtil.convert(
        stringStyleType.Camel,
        stringStyleType.Snake,
        'stringFormat'
      )
    ).toBe('string_format')
    // 获取转换器后再进行转换
    const converter = StringStyleUtil.getConverter(
      stringStyleType.Pascal,
      stringStyleType.ScreamingSnake
    )
    expect(converter.convert('StringUtil')).toBe('STRING_UTIL')
  })
})
