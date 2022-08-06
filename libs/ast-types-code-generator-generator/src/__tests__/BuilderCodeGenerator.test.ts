import { namedTypes as n, builders as b, astNodesAreEquivalent, Type } from 'ast-types'
import { generate, isUsingFrom } from '../generator'
import { mkdirp, remove, writeFile } from 'fs-extra'
import path from 'path'
import { CodeUtil } from '../CodeUtil'

it('isUsingFrom', () => {
  expect(isUsingFrom(b.identifier('name'))).toBeFalsy()
  expect(
    isUsingFrom(
      b.identifier.from({
        name: 'name',
        optional: true,
      }),
    ),
  ).toBeTruthy()
  expect(isUsingFrom(b.file(b.program([])))).toBeFalsy()
})

it('isUsingFrom by parse', () => {
  expect(isUsingFrom(CodeUtil.parse(''))).toBeFalsy()
})

it('meta', () => {
  console.log(b.literal('age'))
  console.log(b.identifier('age'))
  // console.log(b.identifier.from({ name: 'age', optional: true }))
  console.log(Type.from(b.identifier('age'), 'ide'))
  console.log(n.Identifier)

  console.log(Type.def('Identifier'))
})

function check(src1: any, src2: any) {
  astNodesAreEquivalent.assert(CodeUtil.parse(src1), CodeUtil.parse(src2))
}

it('identifier', () => {
  check(CodeUtil.print(generate(b.identifier('age'))), `b.identifier('age')`)
  check(
    CodeUtil.print(
      generate(
        b.identifier.from({
          name: 'age',
          typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword()),
        }),
      ),
    ),
    `b.identifier.from({
      name: "age",
      typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword())
  })`,
  )
})
it('interface', () => {
  check(
    `b.exportNamedDeclaration(b.tsInterfaceDeclaration(b.identifier("User"), b.tsInterfaceBody([
      b.tsPropertySignature(b.identifier("name"), b.tsTypeAnnotation(b.tsStringKeyword())),
      b.tsPropertySignature(b.identifier("age"), b.tsTypeAnnotation(b.tsNumberKeyword()))
  ])))`,
    CodeUtil.print(
      generate(
        // prettier-ignore
        b.exportNamedDeclaration(b.tsInterfaceDeclaration(b.identifier("User"), b.tsInterfaceBody([
          b.tsPropertySignature(b.identifier("name"), b.tsTypeAnnotation(b.tsStringKeyword())),
          b.tsPropertySignature(b.identifier("age"), b.tsTypeAnnotation(b.tsNumberKeyword()))
      ]))),
      ),
    ),
  )
})
it('function', () => {
  check(
    `b.exportNamedDeclaration(b.functionDeclaration(b.identifier("hello"), [b.identifier.from({
  name: "name",
  typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword())
})], b.blockStatement([
  b.returnStatement(b.binaryExpression("+", b.literal("hello "), b.identifier("name")))
])))`,
    CodeUtil.print(
      generate(
        // prettier-ignore
        b.exportNamedDeclaration(b.functionDeclaration(b.identifier("hello"), [b.identifier.from({
          name: "name",
          typeAnnotation: b.tsTypeAnnotation(b.tsStringKeyword())
        })], b.blockStatement([
          b.returnStatement(b.binaryExpression("+", b.literal("hello "), b.identifier("name")))
        ]))),
      ),
    ),
  )
})
it('templateString', () => {
  check(
    CodeUtil.print(
      generate(
        // prettier-ignore
        b.templateLiteral([b.templateElement({
        raw: "visit",
        cooked: "visit"
    }, false), b.templateElement({
        raw: "",
        cooked: ""
    }, true)], [b.callExpression(
        b.memberExpression(b.identifier("type"), b.identifier("toString"), false),
        []
    )]),
      ),
    ),
    `b.templateLiteral([b.templateElement({
    raw: "visit",
    cooked: "visit"
}, false), b.templateElement({
    raw: "",
    cooked: ""
}, true)], [
    b.callExpression(b.memberExpression(b.identifier("type"), b.identifier("toString")), [])
])`,
  )
})
it('class', async () => {
  const ast = CodeUtil.parse(`import { parse, print } from 'recast'
  import { namedTypes as n, visit } from 'ast-types'
  import * as eslint from '@typescript-eslint/typescript-estree'
  import { Type } from 'ast-types/lib/types'
  import { NodePath } from 'ast-types/lib/node-path'
  export class CodeUtil {
    static parse(code: string): n.ASTNode {
      return parse(code, { parser: eslint })
    }
    static print(ast: n.ASTNode): string {
      return print(ast, { parser: eslint }).code
    }
    static iterator<T>(ast: n.ASTNode, type: Type<T>): T[] {
      const res: T[] = []
      visit(ast, {
        [\`visit\${type.toString()}\`](path: NodePath) {
          res.push(path.node)
          return false
        },
      })
      return res
    }
  }
  `)
  console.log(ast)
  console.log(CodeUtil.parse(''))
  const res = CodeUtil.print(generate(ast))
  console.log(res)
  // await mkdir(path.resolve(__dirname, '.temp'))
  // await writeFile(path.resolve(__dirname, '.temp/test.ts'), res)
})
it('tsTypeParameter', () => {
  const from = CodeUtil.parse(`function f<T>(a: T): T {
    return a
  }`)
  check(
    CodeUtil.print(generate(from)),
    `b.file(b.program([b.functionDeclaration.from({
    id: b.identifier("f"),

    params: [b.identifier.from({
        name: "a",
        typeAnnotation: b.tsTypeAnnotation(b.tsTypeReference(b.identifier("T")))
    })],

    body: b.blockStatement([b.returnStatement(b.identifier("a"))]),
    returnType: b.tsTypeAnnotation(b.tsTypeReference(b.identifier("T"))),
    typeParameters: b.tsTypeParameterDeclaration([b.tsTypeParameter("T")])
})]))`,
  )
})

it('object method', () => {
  const from = CodeUtil.parse(`hello({
    [\`\${name}\`]: 'liuli',
    age: 17,
    ['info'](){}
  })`)
  const g1 = generate(from)
  check(
    CodeUtil.print(g1),
    `b.file(b.program([b.expressionStatement(
    b.callExpression(b.identifier("hello"), [b.objectExpression([b.property.from({
        kind: "init",

        key: b.templateLiteral([b.templateElement({
            raw: "",
            cooked: ""
        }, false), b.templateElement({
            raw: "",
            cooked: ""
        }, true)], [b.identifier("name")]),

        value: b.literal("liuli"),
        computed: true
    }), b.property("init", b.identifier("age"), b.literal(17)), b.property.from({
        kind: "init",
        key: b.literal("info"),
        value: b.functionExpression(null, [], b.blockStatement([])),
        method: true,
        computed: true
    })])])
)]))`,
  )
})

const testPath = path.resolve(__dirname, '.temp')

beforeEach(async () => {
  await remove(testPath)
  await mkdirp(testPath)
})

async function evalAst(name: string, ast: n.ASTNode) {
  function wrap(ast: n.ASTNode) {
    return `import { builders as b } from 'ast-types'

    function main() {
      return ${CodeUtil.print(ast)}
    }
    
    export default main
    `
  }
  const filePath = path.resolve(testPath, `${name}.ts`)
  await writeFile(filePath, wrap(ast))
  const f = await import(filePath)
  return CodeUtil.print(f.default())
}

it('test', async () => {
  const list = [
    {
      name: 'hello',
      code: `export function hello(name: string): string {
        return 'hello ' + name
      }
      console.log(hello('liuli'))`,
    },
    {
      name: 'interface',
      code: `export interface User {
      name: string;
      age: number;
  }`,
    },
    {
      name: 'function',
      code: `export function hello(name: string) {
        return "hello " + name;
    }`,
    },
    {
      name: 'templateString',
      code: '`visit${type.toString()}`',
    },
    {
      name: 'class',
      code: `import { parse, print } from 'recast'
      import { namedTypes as n, visit } from 'ast-types'
      import * as eslint from '@typescript-eslint/typescript-estree'
      import { Type } from 'ast-types/lib/types'
      import { NodePath } from 'ast-types/lib/node-path'
      export class CodeUtil {
        static parse(code: string): n.ASTNode {
          return parse(code, { parser: eslint })
        }
        static print(ast: n.ASTNode): string {
          return print(ast, { parser: eslint }).code
        }
        static iterator<T>(ast: n.ASTNode, type: Type<T>): T[] {
          const res: T[] = []
          visit(ast, {
            [\`visit\${type.toString()}\`](path: NodePath) {
              res.push(path.node)
              return false
            },
          })
          return res
        }
      }
      `,
    },
    {
      name: 'tsTypeParameter',
      code: `function f<T>(a: T): T {
        return a
      }`,
    },
    {
      name: 'objectMethod',
      code: `hello({
        [\`\${name}\`]: 'liuli',
        age: 17,
        ['info'](){}
      })`,
    },
    {
      name: 'topLevelAwait',
      code: `import { getEnv } from '@pinefield/app-utils'

      export const envs = await getEnv()
      `,
    },
  ]
  await Promise.all(
    list.map(async (item) => {
      check(await evalAst(item.name, generate(CodeUtil.parse(item.code))), item.code)
    }),
  )
})

it('repeat generate', () => {
  const from = CodeUtil.parse(`
export function hello(name: string): string {
  return 'hello ' + name
}
console.log(hello('liuli'))
  `)
  let temp = from
  const list = Array(6)
    .fill(0)
    .map(() => {
      temp = generate(temp)
      return CodeUtil.print(temp).split('\n').length
    })
  console.log(list)
})
