import { Generator } from '../Generator'
import { CodeUtil } from '@liuli-util/ast-types-code-generator-generator'
import { astNodesAreEquivalent } from 'ast-types'
export type TranslateType = {
  'hello world': { value: 'string'; params: [key: 'hello world'] }
}

const generator = new Generator()
it('基本示例', () => {
  const res = generator.generate([{ key: 'hello world' }])
  astNodesAreEquivalent.assert(
    CodeUtil.parse(res),
    CodeUtil.parse(`export type TranslateType = {
      "hello world": {
          value: string
          params: [key: "hello world"]
      }
  };`),
  )
})
it('测试带有参数和返回值', () => {
  const res = generator.generate([{ key: 'hello', params: ['name'], value: '你好 {{name}}' }])
  astNodesAreEquivalent.assert(
    CodeUtil.parse(res),
    CodeUtil.parse(`
      export type TranslateType = {
              'hello': {
                  value: '你好 {{name}}',
                  params: [key: 'hello', params: {
                      name: string | number
                  },]
              }
          };
              `),
  )
})

it('生成单条', () => {
  console.log(CodeUtil.print(generator.generateByConfig({ key: 'hello world' })))
  console.log(CodeUtil.print(generator.generateByConfig({ key: 'test.params', params: ['what', 'how'] })))
})
