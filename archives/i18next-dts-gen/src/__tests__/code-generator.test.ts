import { expect, it } from 'vitest'
import { generate } from '@liuli-util/ast-types-code-generator-generator'
import { builders as b } from 'ast-types'
import { CodeUtil } from '../utils/CodeUtil'

it('basic', () => {
  const res = CodeUtil.print(
    generate(
      CodeUtil.parse(
        `export type TranslateType = { 'hello world': { value: 'string'; params: [key: 'hello world'] } }`,
      ),
    ),
  )

  console.log(res)

  console.log(
    CodeUtil.print(
      b.tsTypeLiteral([
        b.tsPropertySignature(
          b.literal('hello world'),
          b.tsTypeAnnotation(
            b.tsTypeLiteral([
              b.tsPropertySignature(
                b.identifier('value'),
                b.tsTypeAnnotation(b.tsLiteralType(b.stringLiteral('string'))),
              ),
              b.tsPropertySignature(
                b.identifier('params'),
                b.tsTypeAnnotation(
                  b.tsTupleType([
                    b.tsNamedTupleMember(b.identifier('key'), b.tsLiteralType(b.stringLiteral('hello world'))),
                  ]),
                ),
              ),
            ]),
          ),
        ),
      ]),
    ),
  )
})
