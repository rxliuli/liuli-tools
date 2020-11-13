import { AsyncArray } from './AsyncArray'
import { async } from '../async/async'
import { range } from './range'
import { flatMap } from './flatMap'

describe('test AsyncArray', () => {
  const arr = [1, 2, 3, 4, 5]
  const asyncArr = new AsyncArray(arr)

  it('test forEach', async () => {
    const res: number[] = []
    const fn = (i: number) => res.push(i)
    arr.forEach(fn)
    const arr1 = res.slice()
    res.length = 0
    await new AsyncArray(arr).forEach(async(fn) as any)
    expect(arr1).toEqual(res)
  })
  it('test filter', async () => {
    const fn = (i: number) => i % 2 === 0
    expect(arr.filter(fn)).toEqual(await asyncArr.filter(async(fn)).value())
  })
  it('test map', async () => {
    const fn = (i: number) => i * 2
    expect(arr.map(fn)).toEqual(await asyncArr.map(async(fn)).value())
  })
  it('test every', async () => {
    const fn = (i: number) => i % 2 === 0
    expect(arr.every(fn)).toBe(await asyncArr.every(async(fn)))
  })
  it('test find', async () => {
    const fn = (i: number) => i % 2 === 0
    expect(arr.find(fn)).toBe(await asyncArr.find(async(fn)))
  })
  it('test findIndex', async () => {
    const fn = (i: number) => i % 2 === 0
    expect(arr.findIndex(fn)).toBe(await asyncArr.findIndex(async(fn)))
  })
  it('test flatMap', async () => {
    const fn = (i: number) => range(0, i)
    expect(flatMap(arr, fn)).toEqual(await asyncArr.flatMap(async(fn)).value())
  })
  it('test reduce', async () => {
    const fn = (res: number, i: number) => res - i
    expect(arr.reduce(fn)).toBe(await asyncArr.reduce(async(fn)))
  })
  it('test reduceRight', async () => {
    const fn = (res: number, i: number) => res - i
    expect(arr.reduceRight(fn)).toBe(await asyncArr.reduceRight(async(fn)))
  })
  it('test value', async () => {
    expect(arr).toEqual(await asyncArr.value())
    expect(arr).toEqual(await Array.from(asyncArr))
  })
  it('test for-of', () => {
    for (const item of asyncArr) {
      expect(arr.includes(item)).toBeTruthy()
    }
  })
  it('test from', async () => {
    await expect(() => AsyncArray.from(undefined)).toThrowError()
    expect(await AsyncArray.from(arr)).toEqual(arr)
    expect(await AsyncArray.from(new Set(arr))).toEqual(arr)
  })
  it('test parallel and serial', async () => {
    const filterOddNumber = (i: number) => i % 2 === 1
    const mapDouble = (i: number) => i * 2
    const mapDeleteOne = (i: number) => i - 1
    expect(
      await AsyncArray.from(arr)
        .parallel()
        .filter(async(filterOddNumber))
        .map(async(mapDouble))
        .serial()
        .map(async(mapDeleteOne)),
    ).toEqual(arr.filter(filterOddNumber).map(mapDouble).map(mapDeleteOne))
  })
  it('test cache operation', async () => {
    const result = asyncArr.filter(async (i) => i % 2 === 0)
    expect(await result.map(async (i) => i * 2)).toEqual([4, 8])
    expect(await result).toEqual([2, 4])
    expect(await result).toEqual([2, 4])
  })
  it('test parallel async', async () => {
    await Promise.all([
      expect(asyncArr.filter(async (i) => i % 2 === 0)).resolves.toEqual([
        2,
        4,
      ]),
      expect(asyncArr).resolves.toEqual(arr),
    ])
  })
})
