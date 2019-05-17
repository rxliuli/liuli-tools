var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { onceOfSameParam } from './onceOfSameParam';
import { randomInt } from '../number/randomInt';
/**
 * @test {onceOfSameParam}
 */
describe('test onceOfSameParam', () => {
    it('simple example', () => {
        const add = i => i + Date.now();
        const fn = onceOfSameParam(add);
        const res = fn(0);
        expect(fn(0)).toBe(res);
        expect(fn(0)).toBe(res);
        const res1 = fn(1);
        expect(fn(1)).toBe(res1);
        expect(fn(1)).toBe(res1);
    });
    class User {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    it('simple example for custom parameter converter', () => {
        // 模拟加倍后用户的年龄
        const doubleAge = user => user.age * 2;
        const fn = onceOfSameParam(doubleAge, user => user.name);
        expect(fn(new User('rxliuli', 10))).toEqual(20);
        expect(fn(new User('rxliuli', 20))).toEqual(20);
        expect(fn(new User('rxliuli', 30))).toEqual(20);
    });
    it('test simple async function', () => __awaiter(this, void 0, void 0, function* () {
        // 模拟一个根据姓名获取 User 对象的值的 API
        const getById = (name) => __awaiter(this, void 0, void 0, function* () { return new User(name, randomInt(18)); });
        const fn = onceOfSameParam(getById);
        const res = yield fn('rxliuli');
        expect(yield fn('rxliuli')).toBe(res);
        // 相同的名字不会真正执行到服务端
        expect(yield fn('rxliuli')).toBe(res);
        // 换个名字就不同了
        expect(yield fn('ling_meng')).not.toBe(res);
    }));
    it('test async function for custom paramater converter', () => __awaiter(this, void 0, void 0, function* () {
        // 模拟加倍用户年龄的异步函数
        const doubleAge = (user) => __awaiter(this, void 0, void 0, function* () { return user.age * 2; });
        const fn = onceOfSameParam(doubleAge, user => user.name);
        expect(yield fn(new User('rxliuli', 10))).toEqual(20);
        expect(yield fn(new User('rxliuli', 20))).toEqual(20);
        expect(yield fn(new User('rxliuli'))).toEqual(20);
    }));
    it('test this for lambda', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // 模拟加倍用户年龄的异步函数
            this.i = 10;
            // 注意: 需要自动绑定 this 的话则函数必须是箭头表达式而非 function
            const doubleAge = () => __awaiter(this, void 0, void 0, function* () {
                this.i = this.i * 2;
                return this.i;
            });
            const fn = onceOfSameParam(doubleAge, user => user.name);
            expect(yield fn(new User('rxliuli', 10))).toEqual(20);
            expect(yield fn(new User('rxliuli', 20))).toEqual(20);
            expect(yield fn(new User('rxliuli'))).toEqual(20);
        });
    });
    it('test this for function', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // 模拟加倍用户年龄的异步函数
            this.i = 10;
            // 注意: 需要绑定 this 且函数是 function 的话则必须手动绑定 this
            const doubleAge = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    this.i = this.i * 2;
                    return this.i;
                });
            }.bind(this);
            const fn = onceOfSameParam(doubleAge, user => user.name);
            expect(yield fn(new User('rxliuli', 10))).toEqual(20);
            expect(yield fn(new User('rxliuli', 20))).toEqual(20);
            expect(yield fn(new User('rxliuli'))).toEqual(20);
        });
    });
    it('test this for bind', () => __awaiter(this, void 0, void 0, function* () {
        // 模拟加倍用户年龄的异步函数
        // 或者绑定到返回的函数上面
        function doubleAge() {
            return __awaiter(this, void 0, void 0, function* () {
                this.i = this.i * 2;
                return this.i;
            });
        }
        const fn = onceOfSameParam(doubleAge, user => user.name).bind({ i: 10 });
        expect(yield fn(new User('rxliuli', 10))).toEqual(20);
        expect(yield fn(new User('rxliuli', 20))).toEqual(20);
        expect(yield fn(new User('rxliuli'))).toEqual(20);
    }));
});
