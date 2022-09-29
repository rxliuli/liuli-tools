import { expect, it } from 'vitest'
import { isEqual, dropRightWhile } from 'lodash-es'
import { omitDeep } from '../omitDeep'

it('lodash', () => {
  expect(isEqual([], [])).toBeTruthy()
  expect(dropRightWhile([1, 2, 3], (i) => i > 2)).toEqual([1, 2])

  expect(
    omitDeep(
      {
        name: 'liuli',
        age: 17,

        info: {
          age: 1,
        },
      },
      ['age'],
    ),
  ).toEqual({
    name: 'liuli',
    info: {},
  })
})
