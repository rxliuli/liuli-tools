import { extractField } from './extractField'
import { groupBy } from '../array/groupBy'

describe('test extractField', () => {
  const SEX_KEY = Symbol('SEX_KEY')
  const user = {
    name: 'rx',
    age: 17,
    [SEX_KEY]: false,
    info: {
      address: '幻想乡',
    },
  }
  it('simple example', () => {
    const fn = extractField('age')
    expect(fn(user)).toBe(user.age)
    const fn2 = extractField('info.address')
    expect(fn2(user)).toBe(user.info.address)
    const fn3 = extractField('info2.address')
    expect(fn3(user)).toBeNull()
    const fn4 = extractField(SEX_KEY)
    expect(fn4(user)).toBeFalsy()
  })
  it('deep get field', () => {
    const user2 = { ...user, age: 18 }
    expect(groupBy([user, user2], extractField('age'))).toEqual(
      new Map().set(17, [user]).set(18, [user2]),
    )
  })
})
