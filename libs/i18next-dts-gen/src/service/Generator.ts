import { namedTypes as n, builders as b } from 'ast-types'
import { CodeUtil } from '../utils/CodeUtil'

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
  generateByConfig(config: TranslateTypeConfig): n.TSPropertySignature {
    const params: n.TSNamedTupleMember[] = [
      b.tsNamedTupleMember(b.identifier('key'), b.tsLiteralType(b.stringLiteral(config.key))),
    ]
    if (config.params) {
      params.push(
        b.tsNamedTupleMember(
          b.identifier('params'),
          b.tsTypeLiteral(
            config.params.map((item) =>
              b.tsPropertySignature(
                b.identifier(item),
                b.tsTypeAnnotation(b.tsUnionType([b.tsStringKeyword(), b.tsNumberKeyword()])),
              ),
            ),
          ),
        ),
      )
    }
    return b.tsPropertySignature(
      b.literal(config.key),
      b.tsTypeAnnotation(
        b.tsTypeLiteral([
          b.tsPropertySignature(
            b.identifier('value'),
            b.tsTypeAnnotation(config.value ? b.tsLiteralType(b.stringLiteral(config.value)) : b.tsStringKeyword()),
          ),
          b.tsPropertySignature(b.identifier('params'), b.tsTypeAnnotation(b.tsTupleType(params))),
        ]),
      ),
    )
  }

  generate(configs: TranslateTypeConfig[]): string {
    return CodeUtil.print(
      b.exportNamedDeclaration(
        b.tsTypeAliasDeclaration(b.identifier('TranslateType'), b.tsTypeLiteral(configs.map(this.generateByConfig))),
      ),
    )
  }
}
