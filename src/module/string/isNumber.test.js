
import { isNumber } from './isNumber';

test('test isNumber', ()=>{
  expect(isNumber('7')).toBe(true)
  expect(isNumber('7.5')).toBe(false)
  expect(isNumber('7.a')).toBe(false)
})