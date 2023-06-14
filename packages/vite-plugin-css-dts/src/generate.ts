import { SourceMapGenerator } from 'source-map'
import * as csstree from 'css-tree'
import { namedTypes as n, builders as b } from 'ast-types'
import * as recast from 'recast'
import { keyBy } from 'lodash-es'
import tsParser from 'recast/parsers/typescript.js'

function parse(code: string): csstree.ClassSelector[] {
  const ast = csstree.parse(code, {
    positions: true,
  })

  const r: csstree.ClassSelector[] = []

  csstree.walk(ast, (node) => {
    if (node.type === 'ClassSelector') {
      r.push(node)
    }
  })

  return r
}

function convert(classes: csstree.ClassSelector[]): n.Program {
  const r = b.variableDeclaration('const', [
    b.variableDeclarator(
      b.identifier.from({
        name: 'css',

        typeAnnotation: b.tsTypeAnnotation(
          b.tsTypeLiteral(
            classes.map((s) => b.tsPropertySignature(b.identifier(s.name), b.tsTypeAnnotation(b.tsStringKeyword()))),
          ),
        ),
      }),
    ),
  ])

  ;(r as unknown as n.TSTypeAliasDeclaration).declare = true
  return b.program([r, b.exportDefaultDeclaration(b.identifier('css'))])
}

function format(ast: n.ASTNode): string {
  return recast.prettyPrint(ast).code
}

function sourcemap({
  code,
  classes,
  source,
  target,
}: {
  code: string
  classes: csstree.ClassSelector[]
  source: string
  target: string
}) {
  const root = recast.parse(code, {
    parser: tsParser,
  })

  const cssSelectorsMap = keyBy(classes, (item) => item.name)

  const map = new SourceMapGenerator({
    file: target,
  })

  recast.visit(root, {
    visitTSPropertySignature(path) {
      const name = (path.node.key as n.Identifier).name
      const css = cssSelectorsMap[name]

      interface Pos {
        line: number
        column: number
      }

      function add(original: Pos, generated: Pos) {
        map.addMapping({
          source: source,

          original: {
            line: original.line,
            column: original.column,
          },

          generated: {
            line: generated.line,
            column: generated.column,
          },
        })
      }

      add(css.loc!.start, path.node!.key.loc!.start)
      add(css.loc!.end, path.node!.key.loc!.end)
      return false
    },
  })

  return map.toString()
}

export function generate(cssCode: string, source: string, target: string): string {
  const classes = parse(cssCode)
  const ast = convert(classes)
  const code = format(ast)

  const mapCode = sourcemap({
    code,
    classes,
    source,
    target,
  })

  return code + '\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,' + btoa(mapCode)
}
