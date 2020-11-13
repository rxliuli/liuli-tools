import { compare } from './compare'

// tslint:disable:no-construct
describe('test compare', () => {
  describe('test basic type', () => {
    it('test NaN', () => {
      expect(compare(NaN, NaN)).toBeTruthy()
    })
    it('test zero', () => {
      expect(compare(+0, -0)).toBeFalsy()
      expect(compare(0, +0)).toBeTruthy()
      expect(compare(-0, -0)).toBeTruthy()
    })
    it('test float', () => {
      expect(compare(0.1 + 0.2, 0.3)).toBeTruthy()
    })
    it('test RegExp', () => {
      expect(compare(/^\d+$/, /^\d+$/)).toBeTruthy()
      expect(compare(/^\d+$/, new RegExp('^\\d+$'))).toBeTruthy()
      expect(compare(new RegExp('^\\d+$'), new RegExp('^\\d+$'))).toBeTruthy()
    })
    it('test string', () => {
      expect(compare('str', 'str')).toBeTruthy()
      expect(compare('str', new String('str'))).toBeTruthy()
      expect(compare(new String('str'), new String('str'))).toBeTruthy()
    })
    it('test number', () => {
      expect(compare(1, 1)).toBeTruthy()
      expect(compare(1, new Number(1))).toBeTruthy()
      expect(compare(new Number(1), new Number(1))).toBeTruthy()
    })
    it('test date', () => {
      const date1 = new Date('2018-12-11')
      const date2 = new Date('2018-12-11')
      expect(compare(date1, date2)).toBeTruthy()
    })
  })
})
