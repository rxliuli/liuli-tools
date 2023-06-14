/*
ast-types builder 构造 ast 代码的代码生成器

输入
```ts
export interface User {
  name: string
  age: number
}
```

希望生成

```ts
b.exportNamedDeclaration(
  b.tsInterfaceDeclaration(
    b.identifier('User'),
    b.tsInterfaceBody([
      b.tsPropertySignature(b.identifier('name'), b.tsTypeAnnotation(b.tsStringKeyword())),
      b.tsPropertySignature(b.identifier('age'), b.tsTypeAnnotation(b.tsNumberKeyword())),
    ])
  )
)
```
*/

import { ExpressionKind } from 'ast-types/gen/kinds'

import { namedTypes as n, builders as b, Type, Field, getFieldValue, getBuilderName } from 'ast-types'
import { chain, difference, isEqual } from 'lodash-es'

function generateValue(v: any): n.SpreadElement | ExpressionKind {
  if (Array.isArray(v)) {
    return b.arrayExpression(v.map(generate))
  }

  if (v === null) {
    return b.literal(null)
  }

  if (typeof v === 'object' && v['type']) {
    return generate(v)
  }

  if (typeof v === 'object') {
    return b.objectExpression(
      Object.entries(v).map(([k, v]) =>
        b.property('init', b.identifier(k), generateValue(v) as unknown as n.SpreadPropertyPattern),
      ),
    )
  }

  return b.literal(v)
}

export function isUsingFrom(ast: n.ASTNode): boolean {
  const meta = Type.def(ast.type)

  const built: {
    [name: string]: Field<any>
  } = {}

  return chain(difference(Object.keys(meta.allFields), ['type', 'loc', 'comments']))
    .filter((name) => !meta.buildParams.includes(name))
    .map((name) => {
      const isFilter = isEqual(meta.allFields[name].getValue(built), getFieldValue(ast, name))
      built[name] = getFieldValue(ast, name)

      return {
        name,
        isFilter,
      }
    })
    .dropRightWhile((item) => item.isFilter)
    .map((item) => item.name)
    .some((name) => !isEqual(meta.allFields[name].getValue({}), getFieldValue(ast, name)))
    .value()
}

function generateByParams(ast: n.ASTNode): n.CallExpression {
  const meta = Type.def(ast.type)

  const built: {
    [name: string]: Field<any>
  } = {}

  const params = chain(meta.buildParams)
    .map((name) => {
      const isFilter = isEqual(meta.allFields[name].getValue(built), getFieldValue(ast, name))
      built[name] = getFieldValue(ast, name)

      return {
        name,
        isFilter,
      }
    })
    .dropRightWhile((item) => item.isFilter)
    .map((item) => item.name)
    .map((name) => getFieldValue(ast, name))
    .map(generateValue)
    .value()

  return b.callExpression(b.memberExpression(b.identifier('b'), b.identifier(getBuilderName(ast.type))), params)
}

function generateByFrom(ast: n.ASTNode): n.CallExpression {
  const meta = Type.def(ast.type)

  const built: {
    [name: string]: Field<any>
  } = {}

  const params = chain(difference(meta.fieldNames, ['type', 'loc', 'comments']))
    .filter((name) => {
      const r = !isEqual(meta.allFields[name].getValue(built), getFieldValue(ast, name))
      built[name] = getFieldValue(ast, name)
      return r
    })
    .map((name) => ({
      name: name,
      value: getFieldValue(ast, name),
    }))
    .map((item) =>
      b.property('init', b.identifier(item.name), generateValue(item.value) as unknown as n.SpreadPropertyPattern),
    )
    .value()

  return b.callExpression(
    b.memberExpression(
      b.memberExpression(b.identifier('b'), b.identifier(getBuilderName(ast.type))),
      b.identifier('from'),
    ),
    [b.objectExpression(params)],
  )
}

function generateTsLiteral(value: any) {
  if (typeof value === 'string') {
    return b.stringLiteral(value)
  }

  if (typeof value === 'boolean') {
    return b.booleanLiteral(value)
  }

  if (typeof value === 'number') {
    return b.numericLiteral(value)
  }

  console.log(value)
  throw new Error('generateTsLiteral error ' + value)
}

export function generate(ast: n.ASTNode): n.CallExpression {
  // 兼容 eslint-tree 的问题，ref: <https://github.com/typescript-eslint/typescript-eslint/issues/5424>
  if (ast.type === 'TSTypeParameter' && (ast.name as any).type === 'Identifier') {
    return generate({
      ...ast,
      name: (ast.name as any).name,
    })
  }

  // 兼容解析 TSLiteralType 的问题
  if (ast.type === 'TSLiteralType' && (ast.literal.type as any) === 'Literal') {
    return generate({
      ...ast,
      literal: generateTsLiteral((ast.literal as unknown as n.Literal).value),
    })
  }

  return isUsingFrom(ast) ? generateByFrom(ast) : generateByParams(ast)
}
