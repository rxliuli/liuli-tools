var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { waitResource } from './waitResource';
/**
 * @test {waitResource}
 */
describe('test waitResource', () => {
    it('test waitResource', () => __awaiter(this, void 0, void 0, function* () {
        let num = 0;
        const now = Date.now();
        yield waitResource(() => {
            num++;
            return Date.now() - now > 1000;
        }, {
            interval: 100,
            max: 10,
        });
        expect(Date.now() - now).toBeGreaterThanOrEqual(1000);
        expect(num).toBeLessThanOrEqual(10);
    }));
    it('test this', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.num = 0;
            const now = Date.now();
            yield waitResource(() => {
                this.num++;
                return Date.now() - now > 1000;
            }, {
                interval: 100,
                max: 10,
            });
            expect(Date.now() - now).toBeGreaterThanOrEqual(1000);
            expect(this.num).toBeLessThanOrEqual(10);
        });
    });
});
