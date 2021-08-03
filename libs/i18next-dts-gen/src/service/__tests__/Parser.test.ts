import { TranslateTypeConfig } from '../Generator'
import { LocaleJSON, Parser } from '../Parser'

describe('测试 Parser', () => {
  const parser = new (class extends Parser {
    _parseLocale = this.parseLocale
    _parseVal = this.parseVal
  })('zh')
  function wrap(data: object): LocaleJSON {
    return {
      data,
      path: '',
    } as LocaleJSON
  }
  describe('测试 parse', () => {
    it('基本示例', () => {
      const res = parser.parse([{ name: 'name' }, { age: '年龄' }].map(wrap))
      expect(res).toEqual([
        { key: 'name' },
        { key: 'age' },
      ] as TranslateTypeConfig[])
    })
    it('测试 key 对应的翻译不同的情况', () => {
      const res = parser.parse(
        [
          { 'hello {{name}}': 'hello {{name}}' },
          { 'hello {{name}}': '你好{{name}}，我{{age}}岁了' },
        ].map(wrap),
      )
      expect(res).toEqual([
        { key: 'hello {{name}}', params: ['name'] },
      ] as TranslateTypeConfig[])
    })
  })

  describe('测试 parseConfig', () => {
    it('基本示例', () => {
      const res = parser._parseLocale({
        'hello world': '你好世界',
      })
      expect(res).toEqual([{ key: 'hello world' }] as TranslateTypeConfig[])
    })
    it('测试嵌套', () => {
      expect(() =>
        parser._parseLocale({
          greetings: {
            morning: 'Good morning',
          },
        }),
      ).toThrowError()
    })
    it('测试带参数的翻译字符串', () => {
      const res = parser._parseVal('你好{{name}}，我 {{age}} 岁')
      console.log(res)
    })
    it('测试参数', () => {
      const res = parser._parseLocale({
        'hello {{name}}': '你好 {{name}}',
      })
      expect(res).toEqual([
        {
          key: 'hello {{name}}',
          params: ['name'],
        },
      ] as TranslateTypeConfig[])
    })
    it('测试指定语言', () => {
      const res = parser._parseLocale(
        {
          'hello world': '你好世界',
        },
        true,
      )
      expect(res).toEqual([
        { key: 'hello world', value: '你好世界' },
      ] as TranslateTypeConfig[])
    })
  })
})
