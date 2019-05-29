import { StringStyleUtil } from './StringConverter'
import { StringStyleType } from './StringConverter/StringStyleType'
import { ConverterFactory } from './StringConverter/ConverterFactory'
import { IConverter } from './StringConverter/IConverter'

/**
 * @test {StringConverter}
 */
describe('test StringConverter', () => {
  it('simple example', () => {
    // 直接进行转换
    expect(
      StringStyleUtil.convert(
        StringStyleType.Camel,
        StringStyleType.Snake,
        'stringFormat',
      ),
    ).toBe('string_format')
    expect(
      StringStyleUtil.convert(
        StringStyleType.Snake,
        StringStyleType.Camel,
        'string_format',
      ),
    ).toBe('stringFormat')

    // 获取转换器后再进行转换
    const pascalToScreamingSnakeConverter = StringStyleUtil.getConverter(
      StringStyleType.Pascal,
      StringStyleType.ScreamingSnake,
    )
    expect(pascalToScreamingSnakeConverter.convert('StringUtil')).toBe(
      'STRING_UTIL',
    )
    const screamingSnakeToPascalConverter = StringStyleUtil.getConverter(
      StringStyleType.ScreamingSnake,
      StringStyleType.Pascal,
    )
    expect(screamingSnakeToPascalConverter.convert('STRING_UTIL')).toBe(
      'StringUtil',
    )
  })
  describe('test error', () => {
    it('use null or ""', () => {
      const converter = StringStyleUtil.getConverter(
        StringStyleType.Pascal,
        StringStyleType.ScreamingSnake,
      )
      expect(converter.convert('')).toBe('')
    })
    it('use IConverter', () => {
      const converter = new IConverter()
      expect(() => converter.from('userLastUpdateTime')).toThrowError()
      expect(() =>
        converter.to(['user', 'last', 'update', 'time']),
      ).toThrowError()
    })
  })
})
