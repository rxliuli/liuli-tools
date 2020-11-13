import { kFnToCompare } from './kFnToCompare'

describe('test kFnToCompare', () => {
  it('simple example', () => {
    const arr = [1, 3, 2, 4]
    expect(arr.sort(kFnToCompare((i) => i))).toEqual([1, 2, 3, 4])
    expect(arr.sort(kFnToCompare((i) => -i))).toEqual([4, 3, 2, 1])
  })
})
