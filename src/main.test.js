import rx, { dateFormat } from './main'

test('test main', () => {
  expect(rx).not.toBeNull()
})

test('test main, use dateFormat for import {}', () => {
  const str = '2019-12-11'
  expect(dateFormat(new Date(str), 'yyyy-MM-dd')).toBe(str)
})
