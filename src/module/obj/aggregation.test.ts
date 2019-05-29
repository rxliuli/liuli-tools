import { aggregation } from './aggregation'

describe('test aggregation', () => {
  // 无参数
  class Name {
    public name: string
    constructor() {
      this.name = 'name'
    }
  }
  // 有参构造类
  class Age {
    public age: any
    constructor(age: any) {
      this.age = age
    }
  }
  // 间接继承
  class Sup {
    public sup: any
    constructor(sup: any) {
      this.sup = sup
    }
  }
  class Sub extends Sup {
    public sub: any
    constructor(sup: any, sub: any) {
      super(sup)
      this.sub = sub
    }
  }
  // 静态方法
  class Static {
    public static hello() {
      return 'Static'
    }
  }
  // 同名方法
  // tslint:disable-next-line:max-classes-per-file
  class AddressA {
    public address: any
    constructor(address: any) {
      this.address = address
    }
  }
  // tslint:disable-next-line:max-classes-per-file
  class AddressB {
    public address: any
    constructor(address: any) {
      this.address = address
    }
  }
  it('simple example', () => {
    // tslint:disable-next-line:max-classes-per-file
    class Person extends aggregation(
      new Map()
        .set(Name, undefined)
        .set(Age, (args: { slice: (arg0: number, arg1: number) => void }) =>
          args.slice(0, 1),
        ),
    ) {
      public address: any
      constructor(address: string, ...args: number[]) {
        super(...args)
        this.address = address
      }
      public name(name: any) {
        throw new Error('Method not implemented.')
      }
      public age(age: any) {
        throw new Error('Method not implemented.')
      }
    }

    const person = new Person('幻想乡', 10)
    expect(person.name).toBe('name')
    expect(person.age).toBe(10)
    expect(person.address).toBe('幻想乡')
  })
  it('test indirect inheritance', () => {
    // tslint:disable-next-line:max-classes-per-file
    class Person extends aggregation(
      new Map()
        .set(Name, undefined)
        .set(Sub, (args: { slice: (arg0: number, arg1: number) => void }) =>
          args.slice(0, 2),
        ),
    ) {}

    // @ts-ignore
    const person = new Person('sup', 'sub')
    expect(person.sup).toBe('sup')
    expect(person.sub).toBe('sub')
  })
  it('test static method', () => {
    // tslint:disable-next-line:max-classes-per-file
    class Person extends aggregation(
      new Map().set(Name, undefined).set(Static, undefined),
    ) {}
    // @ts-ignore
    expect(Person.hello()).toBe('Static')
  })
  it('test same name field', () => {
    // tslint:disable-next-line:max-classes-per-file
    class Person extends aggregation(
      new Map()
        .set(
          AddressA,
          (args: { slice: (arg0: number, arg1: number) => void }) =>
            args.slice(0, 1),
        )
        .set(
          AddressB,
          (args: { slice: (arg0: number, arg1: number) => void }) =>
            args.slice(1, 2),
        ),
    ) {}
    // @ts-ignore
    const person = new Person('A', 'B')
    expect(person.address).toBe('B')
  })
  it('test same name field 2', () => {
    // tslint:disable-next-line:max-classes-per-file
    class Person extends aggregation(
      new Map()
        .set(
          AddressA,
          (args: { slice: (arg0: number, arg1: number) => void }) =>
            args.slice(0, 1),
        )
        .set(
          AddressB,
          (args: { slice: (arg0: number, arg1: number) => void }) =>
            args.slice(1, 2),
        ),
    ) {
      public address: any
      constructor(address: string, ...args: string[]) {
        super(...args)
        this.address = address
      }
    }
    // @ts-ignore
    const person = new Person('address', 'A', 'B')
    expect(person.address).toBe('address')
  })
})
