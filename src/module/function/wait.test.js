import { wait } from './wait'

test('test wait sepecify time', async () => {
  const start = Date.now()
  await wait(1000)
  expect(Date.now() - start).toBeGreaterThanOrEqual(1000)
})
