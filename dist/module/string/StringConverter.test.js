import { StringStyleUtil, stringStyleType, IConverter, ConverterFactory, } from './StringConverter';
/**
 * @test {StringConverter}
 */
describe('test StringConverter', () => {
    it('simple example', () => {
        // 直接进行转换
        expect(StringStyleUtil.convert(stringStyleType.Camel, stringStyleType.Snake, 'stringFormat')).toBe('string_format');
        expect(StringStyleUtil.convert(stringStyleType.Snake, stringStyleType.Camel, 'string_format')).toBe('stringFormat');
        // 获取转换器后再进行转换
        const pascalToScreamingSnakeConverter = StringStyleUtil.getConverter(stringStyleType.Pascal, stringStyleType.ScreamingSnake);
        expect(pascalToScreamingSnakeConverter.convert('StringUtil')).toBe('STRING_UTIL');
        const screamingSnakeToPascalConverter = StringStyleUtil.getConverter(stringStyleType.ScreamingSnake, stringStyleType.Pascal);
        expect(screamingSnakeToPascalConverter.convert('STRING_UTIL')).toBe('StringUtil');
    });
    describe('test error', () => {
        it('use null or ""', () => {
            const converter = StringStyleUtil.getConverter(stringStyleType.Pascal, stringStyleType.ScreamingSnake);
            expect(converter.convert(null)).toBe(null);
            expect(converter.convert('')).toBe('');
        });
        it('use IConverter', () => {
            const converter = new IConverter();
            expect(() => converter.from('userLastUpdateTime')).toThrowError();
            expect(() => converter.to(['user', 'last', 'update', 'time'])).toThrowError();
        });
        it('use undefined style type', () => {
            expect(() => ConverterFactory.getInstance(Symbol('custom'))).toThrowError();
        });
    });
});
