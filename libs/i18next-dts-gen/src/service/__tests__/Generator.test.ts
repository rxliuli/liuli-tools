import { Generator } from '../Generator'
import { areSame } from '../../util/areSame'
export type TranslateType = {
  'hello world': { value: 'string'; params: [key: 'hello world'] }
}

describe.skip('测试 Generator', () => {
  const generator = new Generator()
  it('基本示例', () => {
    const res = generator.generate([{ key: 'hello world' }])
    expect(
      areSame(
        res,
        "export type TranslateType = { 'hello world': { value: 'string'; params: [key: 'hello world'] } }",
      ),
    ).toBeTruthy()
  })
  it('测试带有参数和返回值', () => {
    const res = generator.generate([
      { key: 'hello', params: ['name'], value: '你好 {{name}}' },
    ])
    expect(
      areSame(
        res,
        `
export type TranslateType = {
        'hello': {
            value: '你好 {{name}}',
            params: [key: 'hello', params: {
                name: string | number
            },]
        }
    };
        `,
      ),
    ).toBeTruthy()
  })
})
