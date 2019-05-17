var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { timing } from './timing';
import { sleep } from './sleep';
import { wait } from './wait';
/**
 * @test {sleep}
 */
describe('test sleep', () => {
    it('simple example', () => {
        expect(timing(() => sleep(100))).toBeGreaterThanOrEqual(100);
    });
    it('test async queue', () => __awaiter(this, void 0, void 0, function* () {
        let i = 0;
        wait(0).then(() => i++);
        sleep(10);
        expect(i).toBe(0);
        yield wait(0);
        expect(i).toBe(1);
    }));
});
