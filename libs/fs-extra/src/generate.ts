import fsExtra from 'fs-extra'
import { builders as b, namedTypes as n } from 'ast-types'
import { prettyPrint } from 'recast'
import tsParser from 'recast/parsers/typescript'
import path from 'path'
import { fileURLToPath } from 'url'
import { difference } from 'lodash-es'

function scan() {
  const excludes = [
    'FileReadStream',
    'FileWriteStream',
    '_toUnixTimestamp',
    'F_OK',
    'R_OK',
    'W_OK',
    'X_OK',
    'gracefulify',
  ]
  return difference(Object.keys(fsExtra), excludes)
}

function generate(list: string[]) {
  return b.program([
    b.importDeclaration([b.importDefaultSpecifier(b.identifier('fsExtra'))], b.literal('fs-extra')),
    ...list.map((s) =>
      b.exportNamedDeclaration(
        b.variableDeclaration('const', [
          b.variableDeclarator(b.identifier(s), b.memberExpression(b.identifier('fsExtra'), b.identifier(s))),
        ]),
      ),
    ),
  ])
}

export async function build() {
  const list = scan()
  const ast = generate(list)
  const code = prettyPrint(ast, { parser: tsParser }).code
  await fsExtra.writeFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'index.ts'), code)
}
