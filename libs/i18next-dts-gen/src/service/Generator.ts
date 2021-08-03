import { WriterFunctionUtil } from '../util/WriterFunctionUtil'
import { Project, StructureKind, WriterFunction, Writers } from 'ts-morph'
import { RandomUtil } from '../util/RandomUtil'

/**
 * 翻译的字符串
 */
export interface TranslateTypeConfig {
  key: string
  params?: string[]
  value?: string
}

/**
 * 根据解析的结果生成类型定义
 */
export class Generator {
  private project = new Project()

  convert(configs: TranslateTypeConfig[]) {
    return configs.reduce((res, config) => {
      const obj: {
        params?: WriterFunction
        value: WriterFunction
      } = {
        value: WriterFunctionUtil.literal(config.value ?? 'string'),
      }
      const tokens = [
        { name: 'key', type: WriterFunctionUtil.literal(config.key) },
      ]
      if (config.params) {
        tokens.push({
          name: 'params',
          type: Writers.object(
            config.params.reduce((res, p) => {
              res[p] = Writers.unionType('string', 'number')
              return res
            }, {} as Record<string, WriterFunction>),
          ),
        })
      }
      obj.params = WriterFunctionUtil.tuple(tokens)
      res[WriterFunctionUtil.key(config.key)] = Writers.object(obj)
      return res
    }, {} as Record<string, WriterFunction>)
  }

  generate(configs: TranslateTypeConfig[]) {
    const types = this.convert(configs)
    const sourceFile = this.project.createSourceFile(RandomUtil.string(), {
      statements: [
        {
          kind: StructureKind.TypeAlias,
          name: 'TranslateType',
          isExported: true,
          type: Writers.object(types),
        },
      ],
    })
    sourceFile.formatText()
    return sourceFile.getText()
  }
}
