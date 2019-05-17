var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wait } from '../function/wait';
import { Locker } from './Locker';
import { range } from '../array/range';
/**
 * @test {Locker}
 */
describe('test Locker', () => {
    it('simple example', () => __awaiter(this, void 0, void 0, function* () {
        const locker = new Locker();
        const fn = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield locker.lock();
                yield wait(100);
            }
            finally {
                locker.unlock();
            }
        });
        const start = Date.now();
        yield Promise.all(range(1, 10).map(fn));
        expect(Date.now() - start).toBeGreaterThan(1000);
    }));
    it('test order', () => __awaiter(this, void 0, void 0, function* () {
        const locker = new Locker();
        let sum = 0;
        const add = (i) => __awaiter(this, void 0, void 0, function* () {
            try {
                locker.lock();
                yield wait(100);
                sum += i;
            }
            finally {
                locker.unlock();
            }
        });
        add(1).then(() => expect(sum).toBe(1));
        add(2).then(() => expect(sum).toBe(3));
        add(3).then(() => expect(sum).toBe(6));
        add(4).then(() => expect(sum).toBe(10));
    }));
});
