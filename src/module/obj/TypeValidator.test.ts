import { TypeValidator } from './TypeValidator'

describe('test TypeValidator', () => {
  const {
    Type,
    getType,
    isType,
    isString,
    isNumber,
    isBoolean,
    isUndefined,
    isNull,
    isSymbol,
    isPropertyKey,
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
    expect(isString('str')).toBeTruthy()
  })
  it('test isNumber', () => {
    expect(isNumber(1)).toBeTruthy()
  })
  it('test isBoolean', () => {
    expect(isBoolean(false)).toBeTruthy()
  })
  it('test isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy()
  })
  it('test isNull', () => {
    expect(isNull(null)).toBeTruthy()
  })
  it('test isSymbol', () => {
    expect(isSymbol(Symbol('symbol'))).toBeTruthy()
  })
  it('test isPropertyKey', () => {
    expect(isPropertyKey(Symbol())).toBeTruthy()
    expect(isPropertyKey('name')).toBeTruthy()
    expect(isPropertyKey(1)).toBeTruthy()
    expect(isPropertyKey(undefined)).toBeFalsy()
    expect(isPropertyKey(Object.create(null))).toBeFalsy()
  })
  it('test isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject(Object.create(null))).toBeTruthy()
    expect(isObject(() => 1)).toBeFalsy()
  })
  it('test isArray', () => {
    expect(isArray([1, 2, 3])).toBeTruthy()
    expect(isArray(new Array(10))).toBeTruthy()
    expect(isArray(Array.from([1, 2, 3]))).toBeTruthy()
  })
  it('test isFunction', () => {
    expect(isFunction(() => console.log('lambda'))).toBeTruthy()
    expect(
      isFunction(function () {
        console.log('function')
      }),
    ).toBeTruthy()
  })
  it('test isDate', () => {
    expect(isDate(new Date())).toBeTruthy()
  })
  it('test isFile', () => {
    expect(isFile(new File([new Blob()], 'file'))).toBeTruthy()
  })
  it('test isBlob', () => {
    expect(isBlob(new Blob())).toBeTruthy()
  })
  it.skip('test isStream', () => {})
  it('test isArrayBuffer', () => {
    expect(isArrayBuffer(new ArrayBuffer(100))).toBeTruthy()
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
    ).toBeTruthy()
  })
  it('test isFormData', () => {
    expect(isFormData(new FormData())).toBeTruthy()
  })
  it('测试 getType', () => {
    expect(getType('string')).toBe(Type.String)
    expect(getType(1)).toBe(Type.Number)
  })
  it('测试 isType', () => {
    expect(isType('string', Type.String)).toBeTruthy()
    expect(isType(1, Type.Number)).toBeTruthy()
  })
})
