import { expect, it, describe } from 'vitest'
import { StringValidator } from '../StringValidator'

/**
 * @test {stringValidator}
 */
describe('test stringValidator', () => {
  const { isBlank, isEmpty, isFloat, isInteger, isEmail, isIpv4, isTelephone, isMobile, isDomain, isPostcode, isPort } =
    StringValidator

  it('test isBlank', () => {
    expect(isBlank('')).toBe(true)
    expect(isBlank(' ')).toBe(true)
    expect(isBlank('a')).toBe(false)
  })

  it('test isEmpty', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(' ')).toBe(false)
    expect(isEmpty('a')).toBe(false)
  })

  it('test isFloat', () => {
    expect(isFloat('5')).toBe(true)
    expect(isFloat('5.6')).toBe(true)
    expect(isFloat('5.a')).toBe(false)
  })

  it('test isInteger', () => {
    expect(isInteger('7')).toBe(true)
    expect(isInteger('7.5')).toBe(false)
    expect(isInteger('7.a')).toBe(false)
  })

  it('test isEmail', () => {
    expect(isEmail('rx@liuli.com')).toBe(true)
    expect(isEmail('@liuli.com')).toBe(false)
  })

  it('test isIpv4', () => {
    expect(isIpv4('127.0.0.1')).toBe(true)
    expect(isIpv4('127.0.0.266')).toBe(false)
    expect(isIpv4('127.0.0')).toBe(false)
    expect(isIpv4('')).toBe(false)
  })

  it('test isTelephone', () => {
    expect(isTelephone('010-88888888')).toBe(true)
    expect(isTelephone('101-5574021')).toBe(false)
    expect(isTelephone('88888888')).toBe(false)
    expect(isTelephone('')).toBe(false)
  })

  it('test isMobile', () => {
    expect(isMobile('13532611510')).toBe(true)
    expect(isMobile('22345678910')).toBe(false)
    expect(isMobile('')).toBe(false)
  })

  it('test isDomain', () => {
    expect(isDomain('rxliuli.com')).toBe(true)
    expect(isDomain('blog.rxliuli.com')).toBe(true)
    expect(isDomain('rxliuli')).toBe(false)
    expect(isDomain('')).toBe(false)
  })

  it('test isPostcode', () => {
    expect(isPostcode('510000')).toBe(true)
    expect(isPostcode('011231')).toBe(true)
    expect(isPostcode('12345')).toBe(false)
    expect(isPostcode('')).toBe(false)
  })

  it('test isPort', () => {
    expect(isPort('22')).toBe(true)
    expect(isPort('8080')).toBe(true)
    expect(isPort('70000')).toBe(false)
    expect(isPort('')).toBe(false)
  })
})

describe('测试 StringValidator2', () => {
  const { isBlank, isEmpty, isFloat, isInteger, isEmail, isIpv4, isTelephone, isMobile, isDomain, isPostcode, isPort } =
    StringValidator

  function testEmptyOrBlank(fn: typeof isBlank | typeof isEmpty) {
    expect(fn('')).toBe(true)
    expect(fn(' ')).toBe(true)
    expect(fn('a')).toBe(false)
  }

  it('test isBlank', () => {
    testEmptyOrBlank(isBlank)
  })

  it('test isEmpty', () => {
    testEmptyOrBlank(isBlank)
  })

  it('test isFloat', () => {
    expect(isFloat('5')).toBe(true)
    expect(isFloat('5.6')).toBe(true)
    expect(isFloat('5.a')).toBe(false)
  })

  it('test isInteger', () => {
    expect(isInteger('7')).toBe(true)
    expect(isInteger('7.5')).toBe(false)
    expect(isInteger('7.a')).toBe(false)
  })

  it('test isEmail', () => {
    expect(isEmail('rx@liuli.com')).toBe(true)
    expect(isEmail('@liuli.com')).toBe(false)
  })

  it('test isIpv4', () => {
    expect(isIpv4('127.0.0.1')).toBe(true)
    expect(isIpv4('127.0.0.266')).toBe(false)
    expect(isIpv4('127.0.0')).toBe(false)
    expect(isIpv4('')).toBe(false)
  })

  it('test isTelephone', () => {
    expect(isTelephone('010-88888888')).toBe(true)
    expect(isTelephone('101-5574021')).toBe(false)
    expect(isTelephone('88888888')).toBe(false)
    expect(isTelephone('')).toBe(false)
  })

  it('test isMobile', () => {
    expect(isMobile('13532611510')).toBe(true)
    expect(isMobile('22345678910')).toBe(false)
    expect(isMobile('')).toBe(false)
  })

  it('test isDomain', () => {
    expect(isDomain('rxliuli.com')).toBe(true)
    expect(isDomain('blog.rxliuli.com')).toBe(true)
    expect(isDomain('rxliuli')).toBe(false)
    expect(isDomain('')).toBe(false)
  })

  it('test isPostcode', () => {
    expect(isPostcode('510000')).toBe(true)
    expect(isPostcode('011231')).toBe(true)
    expect(isPostcode('12345')).toBe(false)
    expect(isPostcode('')).toBe(false)
  })

  it('test isPort', () => {
    expect(isPort('22')).toBe(true)
    expect(isPort('8080')).toBe(true)
    expect(isPort('70000')).toBe(false)
    expect(isPort('')).toBe(false)
  })
})
