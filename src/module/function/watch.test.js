import { watch } from './watch'
test('test watch', () => {
  let num = 0
  const now = Date.now()
  setInterval(() => num++, 100)
  watch(
    () => num > 10,
    () => {
      expect(num).toBe(10)
      expect(Date.now() - now).toBeGreaterThan(1000)
    }
  )
})
