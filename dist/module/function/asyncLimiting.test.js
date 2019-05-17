var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncLimiting } from './asyncLimiting';
import { wait } from '../function/wait';
import { range } from '../array/range';
import { timing } from '../function/timing';
describe('test asyncLimiting', () => {
    it('simple example', () => __awaiter(this, void 0, void 0, function* () {
        const add = () => wait(100);
        // @ts-ignore
        const fn = asyncLimiting(add);
        const time = yield timing(() => Promise.all(range(0, 10).map(i => fn(i))));
        expect(time).toBeGreaterThan(1000);
    }));
    it('test order', () => __awaiter(this, void 0, void 0, function* () {
        let sum = 0;
        const add = (i) => __awaiter(this, void 0, void 0, function* () {
            yield wait(100);
            sum += i;
        });
        const fn = asyncLimiting(add);
        fn(1).then(() => expect(sum).toBe(1));
        fn(2).then(() => expect(sum).toBe(3));
        fn(3).then(() => expect(sum).toBe(6));
        fn(4).then(() => expect(sum).toBe(10));
    }));
});
