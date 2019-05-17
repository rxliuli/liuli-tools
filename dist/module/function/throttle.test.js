var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { throttle } from './throttle';
import { waitResource } from './waitResource';
import { wait } from './wait';
/**
 * @test {throttle}
 */
describe('test throttle', () => {
    it('simple example', () => __awaiter(this, void 0, void 0, function* () {
        let num = 0;
        const fn = throttle(10, () => num++);
        const now = Date.now();
        yield waitResource(() => {
            fn();
            return Date.now() - now > 100;
        });
        expect(num).toBeLessThanOrEqual(10);
    }));
    it('test this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.num = 0;
            const fn = throttle(10, () => this.num++);
            const now = Date.now();
            yield waitResource(() => {
                fn();
                return Date.now() - now > 100;
            });
            expect(this.num).toBeLessThanOrEqual(10);
        });
    });
    it('test bind this', () => __awaiter(this, void 0, void 0, function* () {
        const obj = { num: 0 };
        const fn = throttle(10, function () {
            this.num++;
        }).bind(obj);
        const now = Date.now();
        yield waitResource(() => {
            fn();
            return Date.now() - now > 100;
        });
        expect(obj.num).toBeLessThanOrEqual(10);
    }));
    it('async and return result', () => __awaiter(this, void 0, void 0, function* () {
        const add = (a, b) => __awaiter(this, void 0, void 0, function* () { return a + b; });
        const fn = throttle(10, add);
        fn(1, 2).then(res => expect(res).toBe(3));
        fn(1, 3).then(res => expect(res).toBe(3));
        fn(1, 4).then(res => expect(res).toBe(3));
        yield wait(20);
        fn(1, 5).then(res => expect(res).toBe(6));
        yield wait(20);
        fn(1, 3).then(res => expect(res).toBe(4));
    }));
});
