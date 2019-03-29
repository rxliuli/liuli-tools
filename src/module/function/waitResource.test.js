import { waitResource } from './waitResource'

test('test waitResource', async () => {
  let num = 0
  const now = Date.now()
  await waitResource(
    () => {
      num++
      return Date.now() - now > 1000
    },
    {
      interval: 100,
      max: 10
    }
  )
  expect(Date.now() - now).toBeGreaterThanOrEqual(1000)
  expect(num).toBe(10)
})
