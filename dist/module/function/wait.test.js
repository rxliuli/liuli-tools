var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wait } from './wait';
import { range } from '../array/range';
import { timing } from './timing';
/**
 * @test {wait}
 */
describe('test wait', () => {
    const time = 500;
    const assertTime = start => {
        // 注意: 此处是为了兼容误差时间，因为 js 中的 setTimeout 本身就是不准确的
        expect(Date.now() - start).toBeGreaterThanOrEqual(time - 10);
    };
    it('test wait for sepecify time', () => __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        yield wait(time);
        assertTime(start);
    }));
    it('test wait for sepecify function', () => __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        yield wait(() => Date.now() > start + time);
        assertTime(start);
    }));
    it('test wait for not sepecify parameter', () => __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        yield wait();
        expect(Date.now() - start).toBeLessThan(100);
    }));
    it('test this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.time = time;
            const start = Date.now();
            yield wait(() => Date.now() > start + this.time);
            assertTime(start);
        });
    });
    it('test Promise.all', () => __awaiter(this, void 0, void 0, function* () {
        let flag = false;
        const add = () => __awaiter(this, void 0, void 0, function* () {
            if (flag) {
                yield wait(() => {
                    const result = !flag;
                    flag = true;
                    return result;
                });
            }
            try {
                // 注意: 这里的 i++ 实际上是异步的
                flag = true;
                yield wait(100);
            }
            finally {
                flag = false;
            }
        });
        const time = yield timing(() => Promise.all(range(0, 10).map(add)));
        expect(time).toBeGreaterThan(1000);
    }));
});
