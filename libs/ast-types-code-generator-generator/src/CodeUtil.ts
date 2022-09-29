import { parse, print } from 'recast'
import { namedTypes as n, visit } from 'ast-types'
import * as eslint from '@typescript-eslint/typescript-estree'
import { Type } from 'ast-types/lib/types'
import { NodePath } from 'ast-types/lib/node-path'

export class CodeUtil {
  static parse(code: string): n.ASTNode {
    return parse(code, {
      parser: eslint,
    })
  }

  static print(ast: n.ASTNode): string {
    return print(ast, {
      parser: eslint,
    }).code
  }

  static iterator<T>(ast: n.ASTNode, type: Type<T>): T[] {
    const res: T[] = []

    visit(ast, {
      [`visit${type.toString()}`](path: NodePath) {
        res.push(path.node)
        return false
      },
    })

    return res
  }
}
