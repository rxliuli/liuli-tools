import { expect, it } from 'vitest'
import { add } from '../index'

it('add', () => {
  expect(add(1, 2)).toBe(3)
})
