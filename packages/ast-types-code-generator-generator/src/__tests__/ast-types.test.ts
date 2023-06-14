import { expect, it } from 'vitest'
import { builders as b, Type } from 'ast-types'

it('meta', () => {
  const ast = b.identifier('name')
  console.log(Type.from(ast))
  console.log('')
})
