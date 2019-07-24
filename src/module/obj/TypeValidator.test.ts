import { TypeValidator } from './TypeValidator'

describe('test TypeValidator', () => {
  const {
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNull,
    isSymbol,
    isObject,
    isArray,
    isFunction,
    isDate,
    isFile,
    isBlob,
    isStream,
    isArrayBuffer,
    isArrayBufferView,
    isURLSearchParams,
    isFormData,
  } = TypeValidator
  it('test isString', () => {
    expect(isString('str')).toBeTrue()
  })
  it('test isNumber', () => {
    expect(isNumber(1)).toBeTrue()
  })
  it('test isBoolean', () => {
    expect(isBoolean(false)).toBeTrue()
  })
  it('test isUndefined', () => {
    expect(isUndefined(undefined)).toBeTrue()
  })
  it('test isNull', () => {
    expect(isNull(null)).toBeTrue()
  })
  it('test isSymbol', () => {
    expect(isSymbol(Symbol('symbol'))).toBeTrue()
  })
  it('test isObject', () => {
    expect(isObject({})).toBeTrue()
    expect(isObject(Object.create(null))).toBeTrue()
    expect(isObject(() => 1)).toBeFalse()
  })
  it('test isArray', () => {
    expect(isArray([1, 2, 3])).toBeTrue()
    expect(isArray(new Array(10))).toBeTrue()
    expect(isArray(Array.from([1, 2, 3]))).toBeTrue()
  })
  it('test isFunction', () => {
    expect(isFunction(() => console.log('lambda'))).toBeTrue()
    expect(
      isFunction(function() {
        console.log('function')
      }),
    ).toBeTrue()
  })
  it('test isDate', () => {
    expect(isDate(new Date())).toBeTrue()
  })
  it('test isFile', () => {
    expect(isFile(new File([new Blob()], 'file'))).toBeTrue()
  })
  it('test isBlob', () => {
    expect(isBlob(new Blob())).toBeTrue()
  })
  it.skip('test isStream', () => {})
  it('test isArrayBuffer', () => {
    expect(isArrayBuffer(new ArrayBuffer(100))).toBeTrue()
  })
  it.skip('test isArrayBufferView', () => {})
  it('test isURLSearchParams', () => {
    expect(
      isURLSearchParams(
        new URLSearchParams({
          name: 'rxliuli',
          age: '17',
        }),
      ),
    ).toBeTrue()
  })
  it('test isFormData', () => {
    expect(isFormData(new FormData())).toBeTrue()
  })
})
