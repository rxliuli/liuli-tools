import { StringValidator } from './StringValidator'

/**
 * @test {stringValidator}
 */
describe('test stringValidator', () => {
  const {
    isBlank,
    isEmpty,
    isFloat,
    isInteger,
    isEmail,
    isIpv4,
    isTelephone,
    isMobile,
    isDomain,
    isPostcode,
    isPort,
  } = StringValidator
  it('test isBlank', () => {
    expect(isBlank(null)).toBeTruthy()
    expect(isBlank(undefined)).toBeTruthy()
    expect(isBlank('')).toBeTruthy()
    expect(isBlank(' ')).toBeTruthy()
    expect(isBlank('a')).toBeFalsy()
  })
  it('test isEmpty', () => {
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(' ')).toBeFalsy()
    expect(isEmpty('a')).toBeFalsy()
  })
  it('test isFloat', () => {
    expect(isFloat('5')).toBeTruthy()
    expect(isFloat('5.6')).toBeTruthy()
    expect(isFloat('5.a')).toBeFalsy()
  })
  it('test isInteger', () => {
    expect(isInteger('7')).toBeTruthy()
    expect(isInteger('7.5')).toBeFalsy()
    expect(isInteger('7.a')).toBeFalsy()
  })
  it('test isEmail', () => {
    expect(isEmail('rx@liuli.com')).toBeTruthy()
    expect(isEmail('@liuli.com')).toBeFalsy()
    expect(isEmail(null)).toBeFalsy()
  })
  it('test isIpv4', () => {
    expect(isIpv4('127.0.0.1')).toBeTruthy()
    expect(isIpv4('127.0.0.266')).toBeFalsy()
    expect(isIpv4('127.0.0')).toBeFalsy()
    expect(isIpv4('')).toBeFalsy()
    expect(isIpv4(null)).toBeFalsy()
  })
  it('test isTelephone', () => {
    expect(isTelephone('010-88888888')).toBeTruthy()
    expect(isTelephone('101-5574021')).toBeFalsy()
    expect(isTelephone('88888888')).toBeFalsy()
    expect(isTelephone('')).toBeFalsy()
    expect(isTelephone(null)).toBeFalsy()
  })
  it('test isMobile', () => {
    expect(isMobile('13532611510')).toBeTruthy()
    expect(isMobile('22345678910')).toBeFalsy()
    expect(isMobile('')).toBeFalsy()
    expect(isMobile(null)).toBeFalsy()
  })
  it('test isDomain', () => {
    expect(isDomain('rxliuli.com')).toBeTruthy()
    expect(isDomain('blog.rxliuli.com')).toBeTruthy()
    expect(isDomain('rxliuli')).toBeFalsy()
    expect(isDomain('')).toBeFalsy()
    expect(isDomain(null)).toBeFalsy()
  })
  it('test isPostcode', () => {
    expect(isPostcode('510000')).toBeTruthy()
    expect(isPostcode('011231')).toBeTruthy()
    expect(isPostcode('12345')).toBeFalsy()
    expect(isPostcode('')).toBeFalsy()
    expect(isPostcode(null)).toBeFalsy()
  })
  it('test isPort', () => {
    expect(isPort('22')).toBeTruthy()
    expect(isPort('8080')).toBeTruthy()
    expect(isPort('70000')).toBeFalsy()
    expect(isPort('')).toBeFalsy()
    expect(isPort(null)).toBeFalsy()
  })
})
describe('测试 StringValidator2', () => {
  const {
    isBlank,
    isEmpty,
    isFloat,
    isInteger,
    isEmail,
    isIpv4,
    isTelephone,
    isMobile,
    isDomain,
    isPostcode,
    isPort,
  } = StringValidator
  function testEmptyOrBlank(fn: typeof isBlank | typeof isEmpty) {
    expect(fn('')).toBeTruthy()
    expect(fn(' ')).toBeTruthy()
    expect(fn('a')).toBeFalsy()
  }

  it('test isBlank', () => {
    testEmptyOrBlank(isBlank)
  })
  it('test isEmpty', () => {
    testEmptyOrBlank(isBlank)
  })
  it('test isFloat', () => {
    expect(isFloat('5')).toBeTruthy()
    expect(isFloat('5.6')).toBeTruthy()
    expect(isFloat('5.a')).toBeFalsy()
  })
  it('test isInteger', () => {
    expect(isInteger('7')).toBeTruthy()
    expect(isInteger('7.5')).toBeFalsy()
    expect(isInteger('7.a')).toBeFalsy()
  })
  it('test isEmail', () => {
    expect(isEmail('rx@liuli.com')).toBeTruthy()
    expect(isEmail('@liuli.com')).toBeFalsy()
  })
  it('test isIpv4', () => {
    expect(isIpv4('127.0.0.1')).toBeTruthy()
    expect(isIpv4('127.0.0.266')).toBeFalsy()
    expect(isIpv4('127.0.0')).toBeFalsy()
    expect(isIpv4('')).toBeFalsy()
  })
  it('test isTelephone', () => {
    expect(isTelephone('010-88888888')).toBeTruthy()
    expect(isTelephone('101-5574021')).toBeFalsy()
    expect(isTelephone('88888888')).toBeFalsy()
    expect(isTelephone('')).toBeFalsy()
  })
  it('test isMobile', () => {
    expect(isMobile('13532611510')).toBeTruthy()
    expect(isMobile('22345678910')).toBeFalsy()
    expect(isMobile('')).toBeFalsy()
  })
  it('test isDomain', () => {
    expect(isDomain('rxliuli.com')).toBeTruthy()
    expect(isDomain('blog.rxliuli.com')).toBeTruthy()
    expect(isDomain('rxliuli')).toBeFalsy()
    expect(isDomain('')).toBeFalsy()
  })
  it('test isPostcode', () => {
    expect(isPostcode('510000')).toBeTruthy()
    expect(isPostcode('011231')).toBeTruthy()
    expect(isPostcode('12345')).toBeFalsy()
    expect(isPostcode('')).toBeFalsy()
  })
  it('test isPort', () => {
    expect(isPort('22')).toBeTruthy()
    expect(isPort('8080')).toBeTruthy()
    expect(isPort('70000')).toBeFalsy()
    expect(isPort('')).toBeFalsy()
  })
})
