import { extractFieldMap } from './extractFieldMap'

describe('test extractFieldMap', () => {
  it('simple example', () => {
    class User {
      constructor(
        public name: string,
        public age: number,
        public sex: boolean,
      ) {}
    }
    const arr = [
      new User('rxliuli', 17, false),
      new User('灵梦', 15, false),
      new User('楚轩', 23, true),
      new User('月姬', 1000, false),
    ]
    expect(extractFieldMap(arr, ['name', 'age', 'sex', 'address'])).toEqual(
      new Map()
        .set(
          'name',
          arr.map(({ name }) => name),
        )
        .set(
          'age',
          arr.map(({ age }) => age),
        )
        .set(
          'sex',
          arr.map(({ sex }) => sex),
        )
        .set(
          'address',
          arr.map((user) => Reflect.get(user, 'address')),
        ),
    )
  })
})
