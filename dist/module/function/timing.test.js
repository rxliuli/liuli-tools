var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { timing } from './timing';
import { wait } from './wait';
/**
 * @test {timing}
 */
describe('test timing', () => {
    it('test timing for normal function', () => {
        const fn = () => {
            let now = Date.now();
            while (true) {
                if (Date.now() - now > 100) {
                    break;
                }
            }
        };
        expect(timing(fn)).toBeGreaterThan(99);
    });
    it('test timing for promise function', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield timing(() => wait(100))).toBeGreaterThan(95);
    }));
    it('test this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.num = 100;
            expect(yield timing(() => wait(this.num))).toBeGreaterThan(95);
        });
    });
});
