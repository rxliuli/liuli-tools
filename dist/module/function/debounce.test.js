var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wait } from './wait';
import { debounce } from './debounce';
import { repeatedCall } from './repeatedCall';
/**
 * @test {debounce}
 */
describe('test debounce', () => {
    it('simple example', () => __awaiter(this, void 0, void 0, function* () {
        let num = 0;
        const fn = debounce(10, () => num++);
        repeatedCall(3, fn);
        yield wait(20);
        expect(num).toBe(1);
        fn();
        yield wait(20);
        expect(num).toBe(2);
    }));
    it('test this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.num = 0;
            const fn = debounce(10, () => this.num++);
            repeatedCall(3, fn);
            yield wait(20);
            expect(this.num).toBe(1);
            fn();
            yield wait(20);
            expect(this.num).toBe(2);
        });
    });
    it('test for bind this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { num: 0 };
            const fn = debounce(10, function () {
                return this.num++;
            }).bind(obj);
            repeatedCall(3, fn);
            yield wait(20);
            expect(obj.num).toBe(1);
            fn();
            yield wait(20);
            expect(obj.num).toBe(2);
        });
    });
    it('async and return result', () => __awaiter(this, void 0, void 0, function* () {
        const add = (a, b) => __awaiter(this, void 0, void 0, function* () { return a + b; });
        const fn = debounce(10, add, 0);
        // 这里没有使用 await 的原因是因为会造成顺序执行
        fn(1, 2).then(res => expect(res).toBe(0));
        fn(1, 3).then(res => expect(res).toBe(0));
        fn(1, 4).then(res => expect(res).toBe(0));
        fn(1, 5).then(res => expect(res).toBe(0));
        fn(1, 4).then(res => expect(res).toBe(5));
        yield wait(200);
        fn(1, 3).then(res => expect(res).toBe(4));
    }));
});
