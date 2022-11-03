import { it, expect } from 'vitest'
import { hello } from '..'

it('hello', () => {
  expect(hello('liuli')).eq('hello liuli')
})
