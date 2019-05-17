var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { once } from './once';
import { repeatedCall } from './repeatedCall';
/**
 * @test {once}
 */
describe('test once', () => {
    it('test multiple calls plus one', () => {
        const add = i => i + 1;
        const fn = once(add);
        expect(fn(0)).toBe(1);
        expect(fn(1)).toBe(1);
        expect(fn(2)).toBe(1);
    });
    it('test async function', () => __awaiter(this, void 0, void 0, function* () {
        const add = (i) => __awaiter(this, void 0, void 0, function* () { return i - 1; });
        const fn = once(add);
        expect(yield fn(3)).toBe(2);
        expect(yield fn(2)).toBe(2);
        expect(yield fn(1)).toBe(2);
    }));
    it('test this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.i = 3;
            const add = () => __awaiter(this, void 0, void 0, function* () { return --this.i; });
            const fn = once(add);
            yield Promise.all(repeatedCall(3, fn));
            expect(yield fn()).toBe(2);
            yield Promise.all(repeatedCall(3, fn));
            expect(this.i).toBe(2);
        });
    });
    it('test bind this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = { i: 3 };
            const add = function () {
                return __awaiter(this, void 0, void 0, function* () {
                    return --this.i;
                });
            };
            const fn = once(add).bind(obj);
            yield Promise.all(repeatedCall(3, fn));
            expect(obj.i).toBe(2);
        });
    });
});
