import { createRequire } from 'module'
import { parse, print } from 'recast'
import { namedTypes as n, builders as b } from 'ast-types'
import { generate } from '@liuli-util/ast-types-code-generator-generator'
const ast = parse(`path.dirname(fileURLToPath(import.meta.url))`, {
  parser: require('recast/parsers/typescript'),
}) as n.File
console.log(print((ast as n.File).program.body[0]).code)
