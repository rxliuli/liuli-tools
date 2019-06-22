import { AsyncArray } from './AsyncArray'
import { async } from '../async/async'
import { range } from './range'
import { flatMap } from './flatMap'

describe('test AsyncArray', () => {
  const arr = [1, 2, 3, 4, 5]
  const asyncArr = new AsyncArray(...arr)

  it('test forEach', async () => {
    const res: number[] = []
    const fn = (i: number) => res.push(i)
    arr.forEach(fn)
    const arr1 = res.slice()
    res.length = 0
    await new AsyncArray(...arr).forEach(async(fn) as any)
    expect(arr1).toIncludeAllMembers(res)
  })
  it('teset filter', async () => {
    const fn = (i: number) => i % 2 === 0
    expect(arr.filter(fn)).toIncludeAllMembers(
      await asyncArr.filter(async(fn)).value(),
    )
  })
  it('test map', async () => {
    const fn = (i: number) => i * 2
    expect(arr.map(fn)).toIncludeAllMembers(
      await asyncArr.map(async(fn)).value(),
    )
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
    expect(flatMap(arr, fn)).toIncludeAllMembers(
      await asyncArr.flatMap(async(fn)).value(),
    )
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
    expect(arr).toIncludeAllMembers(await asyncArr.value())
    expect(arr).toIncludeAllMembers(await Array.from(asyncArr))
  })
  it('test for-of', () => {
    for (const item of asyncArr) {
      expect(arr.includes(item)).toBeTrue()
    }
  })
  it('test from', async () => {
    expect(await AsyncArray.from(undefined)).toIncludeAllMembers([])
    expect(await AsyncArray.from(arr)).toIncludeAllMembers(arr)
    expect(await AsyncArray.from(new Set(arr))).toIncludeAllMembers(arr)
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
    ).toIncludeAllMembers(
      arr
        .filter(filterOddNumber)
        .map(mapDouble)
        .map(mapDeleteOne),
    )
  })
})
