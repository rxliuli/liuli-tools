import { dateFormat } from './dateFormat'
test('test dateFormat', () => {
  const date = new Date('2019-12-11T11:11:10.100')
  expect(dateFormat(date, 'yyyy-MM-dd')).toBe('2019-12-11')
  expect(dateFormat(date, 'hh:mm:ss')).toBe('11:11:10')
})
