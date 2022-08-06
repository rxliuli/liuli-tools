import { AsyncArray } from '../AsyncArray'
import { once } from '../once'
import { wait } from '../wait'

it('once', async () => {
  const fn = jest.fn().mockImplementation((i) => i)
  const res = await AsyncArray.map(
    Array(10)
      .fill(0)
      .map((_, i) => i),
    once(fn),
  )
  expect(fn.mock.calls.length).toBe(1)
  expect(res.every((i) => i === 0)).toBeTruthy()
})

it('wait', async () => {
  const start = Date.now()
  const fn = jest.fn().mockImplementation(async (i) => {
    await wait(100)
    return i
  })
  const res = await AsyncArray.map(
    Array(10)
      .fill(0)
      .map((_, i) => i),
    once(fn),
  )
  expect(fn.mock.calls.length).toBe(1)
  expect(res.every((i) => i === 0)).toBeTruthy()
  expect(Date.now() - start).toBeLessThan(200)
})

it('error', async () => {
  const fn = jest.fn().mockImplementation(async (i) => {
    await wait(100)
    if (i === 0) {
      throw new Error()
    }
  })
  const f = once(fn)
  await expect(
    AsyncArray.map(
      Array(10)
        .fill(0)
        .map((_, i) => i),
      f,
    ),
  ).rejects.toThrowError()
  expect(fn.mock.calls.length).toBe(1)
  await Promise.all([f(1), f(1), f(1)])
  expect(fn.mock.calls.length).toBe(2)
})
