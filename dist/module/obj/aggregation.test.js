import { aggregation } from './aggregation';
describe('test aggregation', () => {
    // 无参数
    class Name {
        constructor() {
            this.name = 'name';
        }
    }
    // 有参构造类
    class Age {
        constructor(age) {
            this.age = age;
        }
    }
    // 间接继承
    class Sup {
        constructor(sup) {
            this.sup = sup;
        }
    }
    class Sub extends Sup {
        constructor(sup, sub) {
            super(sup);
            this.sub = sub;
        }
    }
    // 静态方法
    class Static {
        static hello() {
            return 'Static';
        }
    }
    // 同名方法
    class AddressA {
        constructor(address) {
            this.address = address;
        }
    }
    class AddressB {
        constructor(address) {
            this.address = address;
        }
    }
    it('simple example', () => {
        class Person extends aggregation(new Map().set(Name, undefined).set(Age, args => args.slice(0, 1))) {
            constructor(address, ...args) {
                super(...args);
                this.address = address;
            }
        }
        const person = new Person('幻想乡', 10);
        expect(person['name']).toBe('name');
        expect(person['age']).toBe(10);
        expect(person['address']).toBe('幻想乡');
    });
    it('test indirect inheritance', () => {
        class Person extends aggregation(new Map().set(Name, undefined).set(Sub, args => args.slice(0, 2))) {
        }
        // @ts-ignore
        const person = new Person('sup', 'sub');
        expect(person['sup']).toBe('sup');
        expect(person['sub']).toBe('sub');
    });
    it('test static method', () => {
        class Person extends aggregation(new Map().set(Name, undefined).set(Static, undefined)) {
        }
        // @ts-ignore
        expect(Person.hello()).toBe('Static');
    });
    it('test same name field', () => {
        class Person extends aggregation(new Map()
            .set(AddressA, args => args.slice(0, 1))
            .set(AddressB, args => args.slice(1, 2))) {
        }
        // @ts-ignore
        const person = new Person('A', 'B');
        expect(person.address).toBe('B');
    });
    it('test same name field 2', () => {
        class Person extends aggregation(new Map()
            .set(AddressA, args => args.slice(0, 1))
            .set(AddressB, args => args.slice(1, 2))) {
            constructor(address, ...args) {
                super(...args);
                this.address = address;
            }
        }
        // @ts-ignore
        const person = new Person('address', 'A', 'B');
        expect(person.address).toBe('address');
    });
});
